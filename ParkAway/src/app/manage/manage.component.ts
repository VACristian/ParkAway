import { Component } from '@angular/core';
import { DataHandlerService } from '../services/data-handler.service';
import { SpaceModel } from '../Models/space.model';
import { IndividualSpace } from '../Models/individualspace.model';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { last } from 'rxjs';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent {

  public constructor(public service:DataHandlerService,private modalService:NgbModal){
    
  }
  totalH:any = 0;
  selectedSpaceLoad:any;
  fromDate:NgbDateStruct;
  selectedDate: NgbDateStruct;
  selectedspace:string;
  IndividualSpace:IndividualSpace[]=[];
  Spaces:SpaceModel[]=[];
  Spaces2:SpaceModel[]=[];
  animate = false;
  bool = false;
  highlight1 = false;
  open = false;
  Spaceid:any;
  map:google.maps.Map;
  lat:number;
  lon:number;
  spc:any;
  display: any;
  center: google.maps.LatLngLiteral = {
      lat: 44.31881661208214,
      lng: 23.799262046813965
  };
  zoom = 15;
  


PositionLatLng(latitude:number,long:number) {


  
    const center = {
      lat: latitude,
      lng: long
   
    
  }
  
  return center;
  
}

  
 
  calcSpaceLoad(id:any){
    this.service.getAllTichets(null).subscribe(response => {
      
      const initialHour = [];
      const lastHour = [];
      const UntilformattedDate: string = this.selectedDate.year.toString() + '-' + (this.selectedDate.month < 10 ? '0'+this.selectedDate.month.toString():this.selectedDate.month.toString()) + '-' +
    (this.selectedDate.day <  10 ? '0' + this.selectedDate.day.toString():this.selectedDate.day.toString());
      const FromformattedDate: string = this.fromDate.year.toString() + '-' + (this.fromDate.month < 10 ? '0'+this.fromDate.month.toString():this.fromDate.month.toString()) + '-' +
    (this.fromDate.day <  10 ? '0' + this.fromDate.day.toString():this.fromDate.day.toString());

    
    const initialD:Date = new Date(this.fromDate.year,this.fromDate.month - 1,this.fromDate.day);
    const finalD:Date = new Date(this.selectedDate.year,this.selectedDate.month - 1,this.selectedDate.day);
    let diffinMs = finalD.getTime() - initialD.getTime();
    let diffinDAys= diffinMs / (1000 * 3600 * 24);
    this.totalH =  (diffinDAys + 1) * 24;
      for (let index = 0; index < response.length; index++) { 
        
        if (response[index].individualSpaceId === this.service.serviceIndividualSpcId&&((response[index].validtime).slice(0,10)).toString()>=FromformattedDate&&((response[index].validtime).slice(0,10)).toString()<=(UntilformattedDate)) {
          
          initialHour.push(response[index].initialHour);
          lastHour.push(response[index].validtime.slice(11,13));
        }
      }
    
      
      console.log(initialHour);
      console.log(lastHour);
      let tempValue = [];
      let liveLoad:number = 0;
      for (let i = 0; i < lastHour.length; i++) {
        tempValue[i]=lastHour[i]-initialHour[i]
        console.log(tempValue[i]);
        liveLoad=liveLoad+tempValue[i];
        
      }
      
      console.log(this.selectedDate);
      console.log(id);
      
      this.selectedSpaceLoad =  liveLoad.toFixed(0);
    });

   
  }

  
  mapMoved(event:google.maps.MapMouseEvent){
    this.lat = event.latLng.lat();
    this.lon = event.latLng.lng();
    console.log(`Latitude: ${this.lat}, Longitude: ${this.lon}`);
  }
  
  openModal(content: any) {
    this.modalService.open(content);
  }

  onSpaceClick(id:any,isfull:boolean){
    if(isfull==false){
  const  clickedELEM =  document.getElementById(id) as HTMLElement;
  this.Spaceid=id;
  this.selectedspace = clickedELEM.getAttribute('name')+clickedELEM.getAttribute('id');
  console.log(this.selectedspace);
  
  if(this.Spaceid!=null){
  clickedELEM.classList.add('animate');
  
  console.log(this.Spaceid);
  
  
  setTimeout(()=>{
    clickedELEM.classList.remove('animate')
    
  },1000);
  if(clickedELEM.getAttribute('name')=="Single"){
    this.service.serviceIndividualSpcId = this.Spaceid;
    console.log(this.service.serviceIndividualSpcId);
  }
  else{this.service.ServiceSpaceid =  this.Spaceid;}
  
  return this.Spaceid;
  }
  else{
    return null;
  }
    }
    else{
      console.log('is full not clickable');
    }
  
  }
  
  
   
    highlightanim(spaceToHighlight) {
    spaceToHighlight = document.getElementById(spaceToHighlight);
    spaceToHighlight.scrollIntoView({ behavior: 'smooth', block: 'start' });
    spaceToHighlight.classList.add('highlight1');
      
    spaceToHighlight.classList.add('blackbgandtext');  
      
      
      setTimeout(()=>{
        spaceToHighlight.classList.remove('highlight1');
        spaceToHighlight.classList.add('highlight2');
        
        
    
      
        setTimeout(()=>{
          spaceToHighlight.classList.remove('blackbgandtext');
          spaceToHighlight.classList.remove('highlight2');
          
        },900);
      
  
      },1100);
  
    
    }
  
    onhoveranimate(spaceToHighlight){
      spaceToHighlight = document.getElementById(spaceToHighlight);
    
      spaceToHighlight.classList.add('highlight1');
      
      spaceToHighlight.classList.add('blackbgandtext');  
      
      
      setTimeout(()=>{
        spaceToHighlight.classList.remove('highlight1');
      },1100);
      
    
    
     
    }
    onleaveremove(spaceToHighlight){
      spaceToHighlight = document.getElementById(spaceToHighlight);
      
      spaceToHighlight.classList.add('highlight2');
        
        
    
      
      setTimeout(()=>{
        spaceToHighlight.classList.remove('blackbgandtext');
        spaceToHighlight.classList.remove('highlight2');
        
      },900);
    
    
    
    }

    createSpace(){

      var truevalFull:boolean;
      
      if((<HTMLInputElement>document.getElementById("isFull")).value=="true"){
        truevalFull = true;
      }
      else{
        truevalFull = false;
      }


      this.spc={
        spaceId:0,
        name:(<HTMLInputElement>document.getElementById("nameInput")).value,
        description:(<HTMLInputElement>document.getElementById("descriptionInput")).value,
        location:(<HTMLInputElement>document.getElementById("locationInput")).value,
        isFull:truevalFull,
        parkingSlots:(<HTMLInputElement>document.getElementById("slotsInput")).value,
        price:(<HTMLInputElement>document.getElementById("priceInput")).value,
        lat:(<HTMLInputElement>document.getElementById("latInput")).value,
        lng:(<HTMLInputElement>document.getElementById("lngInput")).value

      }
      this.service.postSpace(this.spc).subscribe((response)=>{
       console.log(response);
       
       for (let index = 0; index < response.parkingSlots; index++) {
        console.log(response.spaceId);
        this.service.postIndividualSpace(response.spaceId).subscribe((response)=>{
          
        });;
        
      }
      })
      this.service.redirectto('/manage');

     
    }
    updSpace(){
      var truevalFull:boolean;
      
      if((<HTMLInputElement>document.getElementById("isFull")).value=="true"){
        truevalFull = true;
      }
      else{
        truevalFull = false;
      }

      this.spc={
        spaceId:0,
        name:(<HTMLInputElement>document.getElementById("nameInput")).value,
        description:(<HTMLInputElement>document.getElementById("descriptionInput")).value,
        location:(<HTMLInputElement>document.getElementById("locationInput")).value,
        isFull:truevalFull,
        parkingSlots:(<HTMLInputElement>document.getElementById("slotsInput")).value,
        price:(<HTMLInputElement>document.getElementById("priceInput")).value,
        lat:(<HTMLInputElement>document.getElementById("latInput")).value,
        lng:(<HTMLInputElement>document.getElementById("lngInput")).value
      };
      console.log(this.spc);
    setTimeout(e=>{
      this.service.updateSpace(this.Spaceid, this.spc).subscribe(
        (response) => {
          console.log('Space updated', response);
          this.service.redirectto('/manage');
        },
        (error) => {
          console.log('Error updating space', error);
        }
      );
    },100)
      
    }
    
    ngOnInit(){
  
      this.service.getAllSpaces(null).subscribe((response)=>{
        this.Spaces = response;
  
        console.log(response.length);
        
  
        console.log(this.Spaces);
        
      })

      this.service.getAllIndividualSpaces().subscribe((response)=>{
        this.IndividualSpace = response;
  
        console.log(response.length);
  
        console.log(this.IndividualSpace);
        
      })
      
    }
}
