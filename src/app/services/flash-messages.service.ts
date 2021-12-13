import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FlashMessage } from '../models/message'; 

@Injectable({
    providedIn: 'root'
})
export class FlashMessageService { 

    liveSeconds: number = 4000;
    message: BehaviorSubject<FlashMessage> = new BehaviorSubject({});

    addMessage(message: FlashMessage): void {
        this.message.next(message);
        setTimeout(() => {
            this.message.next({});
        }, this.liveSeconds);
    }
}