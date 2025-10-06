import {Component, signal, WritableSignal, ChangeDetectionStrategy} from '@angular/core';
import { ButtonComponent } from '@ux/button/button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'push-popup',
  standalone: true,
  imports: [ButtonComponent, CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './push-popup.component.html',
  styleUrl: './push-popup.component.scss'
})
export class PushPopupComponent {
  // Signals для управления состоянием модального окна
  isModalOpen: WritableSignal<boolean> = signal(false);

  // Обычные свойства для формы
  messageText: string = '';
  sendDate: string = 'Сейчас';
  senderName: string = 'Имя отправителя';


  // Методы для управления модальным окном
  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  // Отправка Push уведомления
  sendPush() {
    console.log('Отправка Push:', {
      message: this.messageText,
      sendDate: this.sendDate,
      senderName: this.senderName
    });

    // Здесь будет логика отправки
    this.closeModal();
  }

  // Отмена отправки
  cancelSend() {
    this.closeModal();
  }
}
