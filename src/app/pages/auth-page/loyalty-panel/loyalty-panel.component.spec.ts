import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyPanelComponent } from './loyalty-panel.component';

describe('LoyaltyPanelComponent', () => {
  let component: LoyaltyPanelComponent;
  let fixture: ComponentFixture<LoyaltyPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoyaltyPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoyaltyPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
