import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux } from 'ng2-redux';

import { Unsubscribe } from 'redux';
import { Message } from 'src/app/models/Message';
import { Store } from 'src/app/redux/store';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
 
  

}
