import { Component,ViewChild,ElementRef} from '@angular/core';

import { Data, Router } from '@angular/router';

import { DataHandlerService } from '../services/data-handler.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
//home
export class HomeComponent{

 


  constructor(private router:Router,public service:DataHandlerService){}

onhoveranimate(event:MouseEvent){
  const hoveredelem = event.target as HTMLElement;

  hoveredelem.classList.add('highlight1');
  
  hoveredelem.classList.add('blackbgandtext');  
  
  
  setTimeout(()=>{
    hoveredelem.classList.remove('highlight1')
  },1100);
  


 
}
onleaveremove(event:MouseEvent){
  const hoveredelem = event.target as HTMLElement;
  
    hoveredelem.classList.add('highlight2')
    
    

  
  setTimeout(()=>{
    hoveredelem.classList.remove('blackbgandtext');
    hoveredelem.classList.remove('highlight2');
    
  },900);



}

addcarparking(){
  var carelem =  document.getElementById('car');
  
  
    carelem.classList.add('car-parking');
    
   
  
}

}