import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TimeagoModule } from 'ngx-timeago';
import { Message } from 'src/app/models/message.model';
import { MessageService } from 'src/app/services/message.service';

@Component({
  standalone: true,
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css'],
  imports: [CommonModule, TimeagoModule, FormsModule],
})
export class MemberMessagesComponent {
  messageContent: string = '';
  @Input() username?: string;
  @Input() messages: Message[] = [];
  @ViewChild('messageForm') messageForm?: NgForm;

  ngOnInit(): void {}

  constructor(private messageService: MessageService) {}

  sendMessage() {
    if (!this.username) return;

    this.messageService
      .sendMessage(this.username, this.messageContent)
      .subscribe({
        next: (message) => {
          this.messages.push(message);
        },
      });
  }
}
