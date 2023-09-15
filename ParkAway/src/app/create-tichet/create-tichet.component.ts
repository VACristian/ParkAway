import { Component, ElementRef, Renderer2} from '@angular/core';
import { DataHandlerService } from '../services/data-handler.service';
import { SpaceModel } from '../Models/space.model';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IndividualSpace } from '../Models/individualspace.model';
import { ViewChild, TemplateRef } from '@angular/core';


@Component({
  selector: 'app-create-tichet',
  templateUrl: './create-tichet.component.html',
  styleUrls: ['./create-tichet.component.css']
})


export class CreateTichetComponent {
@ViewChild('alert') alert!:TemplateRef<any>;
public constructor(public service:DataHandlerService,private modalService:NgbModal){}



quickDate: NgbDateStruct;
CurrentTime:Date;
alertTxt:string;
selectedspace:string;
Spaces:SpaceModel[]=[];
IndividualSpace:IndividualSpace[]=[];
animate = false;
bool = false;
highlight1 = false;
open = false;
Spaceid:any;
quickLotId:any;
map:google.maps.Map;
lat:number;
lon:number;
display: any;
center: google.maps.LatLngLiteral = {
    lat: 44.31881661208214,
    lng: 23.799262046813965
};
zoom = 15;

//Functia pentru quick park care realizeaza o selectie random bazata pe un request al tuturor locurilor rezervate pe parcarea respectiva la data si luand in considerare eventualele tichete valide
quickPark()
{
this.service.quickDate=this.quickDate;
this.service.qInitialHour = (<HTMLInputElement>document.getElementById("IHour")).value;
this.service.qValidToHour = (<HTMLInputElement>document.getElementById("THour")).value;
  if(this.service.quickDate===undefined||this.service.qInitialHour===''||this.service.qValidToHour===''){
    this.alertTxt='Please fill in the minimal info in order to access the quick park feature!';
    this.openModal(this.alert);
  }
  else{
this.service.ServiceSpaceid=this.quickLotId;



const updatedReservations = [];

this.service.getAllTichets(null).subscribe(response => {
  
  
  console.log(this.service.quickDate.day);
  const formattedDate: string = this.service.quickDate.year.toString() + '-' + (this.service.quickDate.month < 10 ? '0'+this.service.quickDate.month.toString():this.service.quickDate.month.toString()) + '-' +
  (this.service.quickDate.day <  10 ? '0' + this.service.quickDate.day.toString():this.service.quickDate.day.toString());
  for (let index = 0; index < response.length; index++) {
    console.log((response[index].validtime).slice(0,10).toString()+'si'+formattedDate)
    
    if (response[index].spaceId===this.service.ServiceSpaceid&&response[index].name!='EXPIRED'&&(response[index].validtime).slice(0,10).toString()===formattedDate) {
      
      
      updatedReservations.push(response[index].individualSpaceId);
      
      
    }
  }
  
 
  console.log(updatedReservations);
  
  
});
this.service.getAllIndividualSpaces().subscribe(response=>{

const correct_spaces = [];


for (let index = 0; index < response.length; index++) {
    
  if(response[index].spaceId===this.service.ServiceSpaceid)
  correct_spaces.push(response[index].id)
}

  
    
const extractedArray = correct_spaces.filter((element) => !updatedReservations.includes(element));
const randomIndex = Math.floor(Math.random() * extractedArray.length);
    this.service.quickSpace=extractedArray[randomIndex];
    console.log(this.service.quickSpace);
  
})
this.service.serviceIndividualSpcId=this.service.quickSpace;
setTimeout(()=>{
  this.service.navigateto('/pricing');
  this.modalService.dismissAll();
},100)
  }
}


openModal(content: any) {
  
  if(content!==null){
  this.modalService.open(content);}
  else{return null;}
}

PositionLatLng(latitude:number,long:number) {

  
    const center = {
      lat: latitude,
      lng: long
   
    
  }
  
  return center;
  
}

lotId(id:any){
  this.quickLotId=id;
}



mapMoved(event:google.maps.MapMouseEvent){
  this.lat = event.latLng.lat();
  this.lon = event.latLng.lng();
  console.log(`Latitude: ${this.lat}, Longitude: ${this.lon}`);
}

//Functie care returneaza si asigneaza id-ul uni spatiu si ii adauga animatiile corespunzatoare

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
if(clickedELEM.getAttribute('name')==="Single"){
  this.service.serviceIndividualSpcId = this.Spaceid;
  console.log(this.service.serviceIndividualSpcId);
}
else{this.service.ServiceSpaceid =  this.Spaceid;
}

return this.Spaceid;
}
else{
  return null;
}
  }
  else{
    console.log('is full not clickable');
    this.alertTxt='is full not clickable';
    this.openModal(this.alert);
  }

}



redirectToPricing(){
  this.alertTxt='No space selected';
  
  
  if(this.service.serviceIndividualSpcId===null||this.service.serviceIndividualSpcId===undefined||this.service.serviceIndividualSpcId===''){
    this.openModal(this.alert);
  }
else{
  this.modalService.dismissAll();
  setTimeout(()=>{
    
this.service.navigateto('/pricing');
  },100)
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

  ngOnInit(){
    
    

    this.CurrentTime = new Date();
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
