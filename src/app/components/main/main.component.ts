import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgRedux } from 'ng2-redux';

import { Unsubscribe } from 'redux';
import { Message } from 'src/app/models/Message';
import { Store } from 'src/app/redux/store';
import { MessageService } from 'src/app/services/message.service';
import { VirtualScrollerComponent } from 'ngx-virtual-scroller';
import { trigger,state,style,transition,animate } from '@angular/animations';




@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
  ]
})
export class MainComponent implements OnInit, OnDestroy {
  @ViewChild('scroll') scroller: VirtualScrollerComponent;
  public haveList=false;
  public messages: Message[]=[];


  public messagesToShow: Message[]=[];

  private unsubscribe:Unsubscribe;

  constructor(private redux:NgRedux<Store>,
    private messageService:MessageService){}

    ngOnInit(): void {
      this.unsubscribe = this.redux.subscribe(()=>{
        this.messages = this.redux.getState().messages;
        if (this.messages.length>0){
          this.haveList=true;
          this.appendData();
        }
      });
      this.messageService.getMessages();
      
      setInterval(() => {
        this.appendData();
    }, 2000);
  }
  
  ngOnDestroy(): void {
    this.unsubscribe();
  }
  
  public  i=0;

  appendData() {
    if (this.i===this.messages.length){
      this.i=0;
    }
    this.messagesToShow.push(this.messages[this.i])
    this.i++;
    if (this.messagesToShow.length>3){
      this.messagesToShow.splice(0, 1);
    }
    this.scroller.scrollToIndex(this.messagesToShow.length);
  }

  onVsUpdate(event) {
    console.log('vs update', event);
  }

  onVsChange(event) {
    console.log('vs change', event);
  }

  onVsStart(event) {
    console.log('vs start', event);
  }

  onVsEnd(event) {
    console.log('vs end', event);
  }
}