import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActionType } from '../redux/action-type';
import { Action } from '../redux/action';
import { Store } from '../redux/store';
import { NgRedux } from 'ng2-redux';
import { Message } from '../models/Message';
import { messageUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public constructor(private http: HttpClient, private redux:NgRedux<Store>) { 
    
  }

  public getMessages(): void {
    let observable = this.http.get<Message[]>(messageUrl);
    observable.subscribe(messages=>{
      const action: Action={type:ActionType.GetMessages, payload:messages};
      this.redux.dispatch(action);
    }, messagesError => {
      const action: Action={type:ActionType.GetMessagesError, payload:messagesError.message};
      this.redux.dispatch(action);
    });
  }
}
