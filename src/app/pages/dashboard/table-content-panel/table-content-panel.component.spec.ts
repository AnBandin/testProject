import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableContentPanelComponent } from './table-content-panel.component';

describe('TableContentPanelComponent', () => {
  let component: TableContentPanelComponent;
  let fixture: ComponentFixture<TableContentPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableContentPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableContentPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
