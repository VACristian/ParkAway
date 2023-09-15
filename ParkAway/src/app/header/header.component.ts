import { Component} from '@angular/core';
import { NgbDropdownConfig, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DataHandlerService } from '../services/data-handler.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public service:DataHandlerService,private dropdownConfig: NgbDropdownConfig){
    dropdownConfig.placement = 'bottom-right';
  }
  //header
 
}




