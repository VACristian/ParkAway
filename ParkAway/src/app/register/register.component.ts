import { Component } from '@angular/core';
import { DataHandlerService } from '../services/data-handler.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public constructor(public service:DataHandlerService,private modalService:NgbModal){}
  open(content: any) {
    this.modalService.open(content);
  }
  
}
