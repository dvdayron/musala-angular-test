import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingService { 

    isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor() {
        this.hide();
    }

    show(): void {
        this.isLoading.next(true);
    }

    hide(): void {
        this.isLoading.next(false);
    }
}