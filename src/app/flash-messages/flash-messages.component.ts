import { Component, OnInit } from '@angular/core';
import { FlashMessageService } from '../services/flash-messages.service';
import { FlashMessage } from '../models/message'; 

@Component({
  selector: 'flash-messages',
  templateUrl: './flash-messages.component.html'
})
export class FlashMessagesComponent implements OnInit {

  message: FlashMessage = {};

  constructor(
    private flashMessageService: FlashMessageService
  ) { }

  ngOnInit(): void {
    this.flashMessageService.message.subscribe((message) => this.message = message);
  }
}
