import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHeaderPanelComponent } from './table-header-panel.component';

describe('TableHeaderPanelComponent', () => {
  let component: TableHeaderPanelComponent;
  let fixture: ComponentFixture<TableHeaderPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableHeaderPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableHeaderPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
