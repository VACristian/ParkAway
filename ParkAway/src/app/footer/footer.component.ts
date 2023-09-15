import { Component } from '@angular/core';
import { DataHandlerService } from '../services/data-handler.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  //Navigare si check daca user-ul e logat pentru a afisa si a face mai departe alt check sa vedem daca este admin
  constructor(public service:DataHandlerService){}


  ngOnInit(){
    this.service.GetDecodedToken();
    
    if(this.service.decodedId==null){
      this.service.hideAdminPanels = true;
    
  }
  else{
    this.service.getUserById();
     
       
      
      
  }
}

}
