import { Component } from '@angular/core';
import { DataHandlerService } from '../services/data-handler.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public constructor(public service:DataHandlerService,private modalService:NgbModal){}


 
  open(content: any) {
    this.modalService.open(content);
    setTimeout(e => {
      this.modalService.dismissAll(content);
    }, 1000);
  }
}
