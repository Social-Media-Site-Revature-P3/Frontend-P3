import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupmsgService {
  message = new BehaviorSubject<string>("");
  message$ = this.message.asObservable();
  constructor() { }

  setMessage(message: string): void {
    this.message.next(message);
    setTimeout(() => { this.message.next("")}, 5000);
}

  resetMessage(): void{
    this.message.next("");
  }
  
}
