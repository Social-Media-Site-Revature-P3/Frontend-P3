import { Component, OnInit } from '@angular/core';
import { PopupmsgService } from 'src/app/services/popupmsg.service';

@Component({
  selector: 'app-popup-msg',
  templateUrl: './popup-msg.component.html',
  styleUrls: ['./popup-msg.component.css']
})
export class PopupMsgComponent implements OnInit {
  message: string;
  showmsg: boolean = false;

  constructor(private popupmsgService: PopupmsgService) { this.message = ""; }

  ngOnInit(): void {
    this.popupmsgService.message$.subscribe(
      data => {
        this.message = data;
        if (data != '') {
          this.showmsg = true;
        } else {
         this.showmsg = false;         
        }
      } );
  }

}
