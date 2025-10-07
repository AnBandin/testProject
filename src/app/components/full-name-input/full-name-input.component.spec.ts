import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullNameInputComponent } from './full-name-input.component';

describe('FullNameInputComponent', () => {
  let component: FullNameInputComponent;
  let fixture: ComponentFixture<FullNameInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullNameInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullNameInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
