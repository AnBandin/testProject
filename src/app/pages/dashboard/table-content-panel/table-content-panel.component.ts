import {AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ClientService} from "../../../services/client.service";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatPaginator, MatPaginatorIntl, MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {MyCustomPaginatorIntl} from "../../../localization/table.material.service";
import {
  DatePipe,
  KeyValuePipe,
  NgForOf,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
  NgTemplateOutlet
} from "@angular/common";
import {User} from "../../../models/client.model";
import {debounceTime, distinctUntilChanged, Subject} from "rxjs";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatCheckbox} from "@angular/material/checkbox";
import {PushPopupComponent} from "../push-popup/push-popup.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {NewClientPopupComponent} from "../new-client-popup/new-client-popup.component";

@Component({
  selector: 'table-content-panel',
  standalone: true,
  imports: [
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgForOf,
    KeyValuePipe,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgTemplateOutlet,
    MatCheckbox,
    DatePipe,
    PushPopupComponent,
    NewClientPopupComponent
  ],
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table-content-panel.component.html',
  styleUrl: './table-content-panel.component.scss'
})
export class TableContentPanelComponent implements OnInit, AfterViewInit {
  private clientService = inject(ClientService);
  private destroyRef = inject(DestroyRef);
  private searchSubject = new Subject<string>();

  dataSource = new MatTableDataSource<User>([]);
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  searchQuery: string = '';

  selectedItems: number[] = [];
  isAllSelected = false;
  isIndeterminate = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columnLabels: Record<string, string> = {
    user_id: 'ID',
    telegram: 'Устройство',
    template: 'Макет карты',
    barcode: 'Номер карты',
    last_name: 'Фамилия владельца',
    first_name: 'Имя владельца',
    phone: 'Номер телефона',
    discount: 'Скидка',
    bonus: 'Бонусы',
    summ: 'Средний чек',
    summ_all: 'Сумма покупок',
    link: 'Ссылка на карту',
    created_at: 'Дата создания'
  };
  displayedColumns: string[] = Object.keys(this.columnLabels);

  ngOnInit() {
    this.setupSearch();
    this.loadPage(this.pageIndex, this.pageSize);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onSearchChange() {
    this.searchSubject.next(this.searchQuery);
  }

  onPage(e: PageEvent) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.loadPage(this.pageIndex, this.pageSize, this.searchQuery);
  }

  private setupSearch() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(searchTerm => {
      this.pageIndex = 0;
      this.loadPage(this.pageIndex, this.pageSize, searchTerm);
    });
  }

  private loadPage(pageIndex: number, pageSize: number, search?: string) {
    const offset = pageIndex * pageSize;
    this.clientService.getClient(pageSize, offset, search)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(resp => {
      this.dataSource.data = resp.passes;
      this.length = resp.meta.size;
      this.selectedItems = [];
      this.updateSelectionState();
    });
  }

  toggleSelectAll() {
    if (this.isAllSelected) {
      this.selectedItems = [];
    } else {
      this.selectedItems = this.dataSource.data.map(item => item.user_id);
    }
    this.updateSelectionState();
  }

  toggleItemSelection(userId: number) {
    const index = this.selectedItems.indexOf(userId);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    } else {
      this.selectedItems.push(userId);
    }
    this.updateSelectionState();
  }

  isItemSelected(userId: number): boolean {
    return this.selectedItems.includes(userId);
  }

  private updateSelectionState() {
    const totalItems = this.dataSource.data.length;
    const selectedCount = this.selectedItems.length;

    this.isAllSelected = selectedCount === totalItems && totalItems > 0;
    this.isIndeterminate = selectedCount > 0 && selectedCount < totalItems;
  }
}





