import {
  Component,
  signal,
  WritableSignal,
  ChangeDetectionStrategy,
  Input,
  inject, DestroyRef
} from '@angular/core';
import { ButtonComponent } from '@ux/button/button.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PushData } from '../../../models/client.model';
import {ClientService} from "../../../services/client.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'push-popup',
  standalone: true,
  imports: [ButtonComponent, CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './push-popup.component.html',
  styleUrl: './push-popup.component.scss'
})
export class PushPopupComponent {

  private clientService = inject(ClientService);
  private destroyRef = inject(DestroyRef);


  @Input() selectedItems: number[] = [];

  isModalOpen: WritableSignal<boolean> = signal(false);

  messageText: string = '';
  sendDate: string = 'Сейчас';
  senderName: string = 'Имя отправителя';

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  sendPush() {
    const pushData: PushData = {
      user_id: this.selectedItems.join(','),
      date_start: this.getDateStart(),
      push_message: this.messageText
    };

    this.clientService.sendPush(pushData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();

    this.closeModal();
  }

  private getDateStart(): string {
    const now = new Date();

    switch (this.sendDate) {
      case 'Завтра':
        now.setDate(now.getDate() + 1);
        break;
      case 'Через неделю':
        now.setDate(now.getDate() + 7);
        break;
      default:
        now.setSeconds(now.getSeconds() + 5);
        break;
    }

    return now.toISOString();
  }

  cancelSend() {
    this.closeModal();
  }
}
