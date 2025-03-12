import { Component, inject, Input, input, OnInit, output, ViewChild } from '@angular/core';
import { Message } from '../../_models/message';
import { MessageService } from '../../_services/message.service';
import { TimeagoModule } from 'ngx-timeago';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-messages',
  imports: [TimeagoModule, FormsModule],
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css'
})
export class MemberMessagesComponent {

  @ViewChild('messageFrom') messageForm?: NgForm;
  username = input.required<string>();
  messages = input.required<Message[]>();
  private messageService = inject(MessageService);
  messageContent = '';
  updateMessage = output<Message>();

  sendMessage (){
    this.messageService.sendMessage(this.username(), this.messageContent).subscribe({
      next: message =>{
        this.updateMessage.emit(message);
        this.messageForm?.reset();
      }
    })
  }
}
