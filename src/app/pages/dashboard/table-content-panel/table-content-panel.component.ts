import {AfterViewInit, ChangeDetectionStrategy, Component, inject, OnInit, ViewChild} from '@angular/core';
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
    PushPopupComponent
  ],
  providers: [{provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl}],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table-content-panel.component.html',
  styleUrl: './table-content-panel.component.scss'
})
export class TableContentPanelComponent implements OnInit, AfterViewInit {
  private clientService = inject(ClientService);
  private searchSubject = new Subject<string>();

  dataSource = new MatTableDataSource<User>([]);
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  searchQuery: string = '';

  selectedItems = new Set<number>();
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
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.pageIndex = 0;
      this.loadPage(this.pageIndex, this.pageSize, searchTerm);
    });
  }

  private loadPage(pageIndex: number, pageSize: number, search?: string) {
    const offset = pageIndex * pageSize;
    this.clientService.getClient(pageSize, offset, search).subscribe(resp => {
      this.dataSource.data = resp.passes;
      this.length = resp.meta.size;
      this.selectedItems.clear();
      this.updateSelectionState();
    });
  }

  toggleSelectAll() {
    if (this.isAllSelected) {
      this.selectedItems.clear();
    } else {
      this.dataSource.data.forEach(item => {
        this.selectedItems.add(item.user_id);
      });
    }
    this.updateSelectionState();
  }

  toggleItemSelection(userId: number) {
    if (this.selectedItems.has(userId)) {
      this.selectedItems.delete(userId);
    } else {
      this.selectedItems.add(userId);
    }
    this.updateSelectionState();
  }

  isItemSelected(userId: number): boolean {
    return this.selectedItems.has(userId);
  }

  private updateSelectionState() {
    const totalItems = this.dataSource.data.length;
    const selectedCount = this.selectedItems.size;

    this.isAllSelected = selectedCount === totalItems && totalItems > 0;
    this.isIndeterminate = selectedCount > 0 && selectedCount < totalItems;
  }
}





