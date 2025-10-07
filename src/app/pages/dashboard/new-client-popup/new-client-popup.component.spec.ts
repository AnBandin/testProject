import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NewClientPopupComponent } from './new-client-popup.component';

describe('NewClientPopupComponent', () => {
  let component: NewClientPopupComponent;
  let fixture: ComponentFixture<NewClientPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewClientPopupComponent, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(NewClientPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal when openModal is called', () => {
    component.openModal();
    expect(component.isModalOpen()).toBe(true);
  });

  it('should close modal when closeModal is called and reset form values', () => {
    // arrange: set some values
    component.clientForm.get('fullName')?.setValue('Иванов Иван');
    component.clientForm.get('phone')?.setValue('79876543211');
    component.clientForm.get('email')?.setValue('test@test.com');
    component.clientForm.get('birthday')?.setValue('2000-01-01');
    component.clientForm.get('gender')?.setValue('м');
    component.clientForm.get('barcode')?.setValue('000001');
    component.clientForm.get('discount')?.setValue('10');
    component.clientForm.get('bonus')?.setValue(100);
    component.clientForm.get('loyaltyLevel')?.setValue('Бронзовый');

    // act
    component.closeModal();

    // assert: modal closed
    expect(component.isModalOpen()).toBe(false);
    // assert: form reset to defaults
    expect(component.clientForm.get('template')?.value).toBe('Тестовый');
    expect(component.clientForm.get('fullName')?.value).toBe('');
    expect(component.clientForm.get('phone')?.value).toBe('');
    expect(component.clientForm.get('email')?.value).toBe('');
    expect(component.clientForm.get('birthday')?.value).toBe('');
    expect(component.clientForm.get('gender')?.value).toBe('');
    expect(component.clientForm.get('barcode')?.value).toBe('');
    expect(component.clientForm.get('discount')?.value).toBe('');
    expect(component.clientForm.get('bonus')?.value).toBe(0);
    expect(component.clientForm.get('loyaltyLevel')?.value).toBe('');
  });

  it('should validate form correctly via isFormValid()', () => {
    // initially invalid
    expect(component.isFormValid()).toBe(false);

    // provide minimal valid values
    component.clientForm.get('fullName')?.setValue('Иванов Иван');
    component.clientForm.get('phone')?.setValue('79876543211');
    component.clientForm.get('email')?.setValue('valid@mail.com');

    expect(component.isFormValid()).toBe(true);
  });
});
