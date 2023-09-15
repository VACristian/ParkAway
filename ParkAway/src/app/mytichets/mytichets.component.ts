import { Component, ElementRef, ViewChild } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';
import { TichetModel } from '../Models/tichet.model';
import { DataHandlerService } from '../services/data-handler.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import jsPDF from 'jspdf';
import { SpaceModel } from '../Models/space.model';






@Component({
  selector: 'app-mytichets',
  templateUrl: './mytichets.component.html',
  styleUrls: ['./mytichets.component.css']
})


export class MytichetsComponent {

constructor(public service:DataHandlerService,private modalService: NgbModal){}

tichets:TichetModel[]=[];
thingtosearchby:string;
searchplaceholder:string;
spaceloc:SpaceModel;
HistoryPressed:boolean=false;
HistoryString:string = 'EXPIRED';


showHistory(){
  this.HistoryPressed=!this.HistoryPressed;
  this.HistoryString = this.HistoryPressed ? 'Tichet' : 'EXPIRED';

  console.log(this.HistoryPressed,this.HistoryString)
  
}

processDate(VDate,filehour:number){
  VDate = new Date(VDate);

if(VDate!=null&&(filehour == null)){
   
  var PostMeridian;

  if((VDate.getHours())>12){
    PostMeridian = 'PM';

  }
  else{
    PostMeridian = 'AM';
  }

return (VDate.getDate()+'/'+(VDate.getMonth()+1)+'/'+VDate.getFullYear()+' '+VDate.getHours()+':'+VDate.getMinutes())+'0'+' '+PostMeridian;
  
}
  else {

  
      var PostMeridian;
      VDate.setHours(filehour);
      if((VDate.getHours())>12){
        PostMeridian = 'PM';
    
      }
      else{
        PostMeridian = 'AM';
      }
    
    return (VDate.getDate()+'/'+(VDate.getMonth()+1)+'/'+VDate.getFullYear()+' '+VDate.getHours()+':'+VDate.getMinutes())+'0'+' '+PostMeridian;
  }

}

open(content: any) {
  this.modalService.open(content);
}

qrValid(qrdata:any){
  var hide:boolean;
  if(qrdata=="VALID"){
    hide = false;
  }
  else{
    hide = true;
  }
  return hide;
}

getSpaceLocation(spaceid:number){
  this.service.getAllSpaces(spaceid).subscribe((response)=>{
    
    this.spaceloc = response.location;
    console.log(this.spaceloc);
    
  return this.spaceloc;
    
  });
}

getpdf(id:any){
  const doc = new jsPDF({
    format: [document.getElementById(id).offsetHeight, document.getElementById(id).offsetWidth], // dimensions in mm (11x8.5 inches)
    unit: 'px'
  });
const element = document.getElementById(id);



doc.html(element, {
  callback: () => {
    doc.save('my-pdf-file.pdf');
  }
});
}



searchtichet(){

this.thingtosearchby = (<HTMLInputElement>document.getElementById("SearchTichet")).value;



  if(this.service.decodedId!=null){
  this.service.getAllTichets(this.service.decodedId).subscribe((response)=>{
    if(this.thingtosearchby == ""){
    this.tichets=response;
    console.log("not found");
    
  }
  else{
  
  
    const inputeelem = document.getElementById('SearchTichet') as HTMLInputElement;
    var filteredTichets = response.filter((tichet) => {
      
      return ((tichet.licensePlate).toLowerCase()).includes(this.thingtosearchby.toLowerCase());
      
    });
    
    if (filteredTichets.length > 0) {
      // Found some results
      this.searchplaceholder = "Found some results";
    } else {
      filteredTichets = response.filter((tichet) => {
        return ((tichet.location).toLowerCase()).includes(this.thingtosearchby.toLowerCase());
        
      });
      if(filteredTichets.length >0){
        this.searchplaceholder = "Found some results";
      }
      else{
        this.searchplaceholder = "The tichet/s were not found";
      }
    }
    
    
    inputeelem.value = ''; // Clear the input field
    this.tichets = filteredTichets; // Update the tichets array 
  }
    
  });
}
}



ngOnInit(){
  

  this.searchplaceholder = "Search by license plate or location" 
  var decodedtoken = this.service.GetDecodedToken();
  if(decodedtoken!=null){
  this.service.decodedName = decodedtoken['Name'];}
  if(this.service.decodedId!=null){
  this.service.getAllTichets(this.service.decodedId).subscribe((response)=>{
    
    this.tichets = response;
    console.log(this.tichets);
    
  
    
  });
}
}
}
