import { Component, TemplateRef, ViewChild,} from '@angular/core';
import { DataHandlerService } from '../services/data-handler.service';
import { TichetModel } from '../Models/tichet.model';
import { NgbDateStruct, NgbModal, NgbTimeStruct,} from '@ng-bootstrap/ng-bootstrap';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  providers: [NgbTimepickerConfig],
  styleUrls: ['./pricing.component.css'],

})

export class PricingComponent {
  
  public constructor(public service:DataHandlerService,private modalService:NgbModal){}

  @ViewChild('content') contentTemplate: TemplateRef<any>;
  @ViewChild('payment') paymentTemplate: TemplateRef<any>;
 

  open(modalRefStr:string) {
    if(modalRefStr==='content'){
    const modalRef = this.modalService.open(this.contentTemplate);
    setTimeout(() => {
      modalRef.dismiss();
    }, 5000);}
    else if(modalRefStr==='payment'){
      const modalRef = this.modalService.open(this.paymentTemplate);
      setTimeout(() => {
        modalRef.dismiss();
      }, 600000);
    }
  }

  timepickerConfig:NgbTimepickerConfig = {
    minuteStep:60,
    meridian: false,
    spinners: true,
    seconds: true,
    hourStep: 1,
    secondStep: 0,
    disabled: false,
    readonlyInputs: false,
    size: 'small'
  }
  validTime: NgbTimeStruct = {
    hour:  12, minute: 0,
    second: 0
  };
  selectedTime: NgbTimeStruct = {
    hour: this.validTime.hour-1, minute: 0,
    second: 0
  };
  cardNumber: string = '';
  expirationDate: string = '';
  cvv: string = '';
  processingAnimationHidden:boolean;
  selectedDate: NgbDateStruct;
  utcDate: string;  
  price: number = 0;
  hidden: boolean = true;
  qrstring: string ="";
  dateInsert:Date;
  hour1:any;
  validto:any;
  validfrom:any;
  licenseplate:any;
  CurrentTime:Date;
  estimatepressed:boolean;
  pricingAlertText:string;
  currentReservations:TichetModel[]=[];
  InitialRedHours:number[]=[];
  
 
  

  
  ngOnInit(){
    this.CurrentTime = new Date();
    this.estimatepressed =  true;
    if(this.service.quickSpace!==null&&this.service.quickDate!==null&&this.service.qInitialHour!==null&&this.service.qValidToHour!==null){
      this.selectedDate=this.service.quickDate;
      this.validTime.hour=parseInt(this.service.qValidToHour);
      this.selectedTime.hour=parseInt(this.service.qInitialHour);
    }
  }  

  addAnim(id:any){
    if(this.cardNumber === ''||this.expirationDate === ''|| this.cvv === ''){
      console.log('dont play')
    }
    else{
      var elem =  document.getElementById(id);
    
    
      elem.classList.add('success-animation');
  }
    
      
     
    
  }
processPay(){
    if(this.cardNumber === ''||this.expirationDate === ''|| this.cvv === ''){
      this.pricingAlertText='Please fill in all information before proceeding';
      this.open('content');
    }
    else{
    this.processingAnimationHidden=false;
    setTimeout(e=>{
      this.bindValues();
    },5000);
  }
  }
  goToPay(){
    if (this.InitialRedHours.includes(this.selectedTime.hour)){
      this.pricingAlertText='Reserved';
      this.open('content');
    }
    else{
      this.open('payment');
    }
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

  bindValues(){
   
    if(this.service.quickSpace!==null&&this.service.quickDate!==null&&this.service.qInitialHour!==null&&this.service.qValidToHour!==null){
    this.selectedDate=this.service.quickDate;
    this.validTime.hour=this.service.qInitialHour;
    this.selectedTime.hour=this.service.qValidToHour;
      console.log(this.selectedDate);
      this.service.serviceIndividualSpcId=this.service.quickSpace;
      const date = new Date(this.service.quickDate.year, this.service.quickDate.month - 1, this.service.quickDate.day);
      this.dateInsert = date;
      this.validfrom = this.service.qInitialHour;
      this.validto =this.service.qValidToHour;
      this.service.initialTichetHour = this.validfrom;
      this.dateInsert.setUTCHours(this.validto, 0, 0, 0);
      console.log('quick park succes');
    }
    else{
      console.log('quick park failed');
  this.validto = this.validTime.hour;
  this.validfrom =  this.selectedTime.hour;
  const date = new Date(this.selectedDate.year, this.selectedDate.month - 1, this.selectedDate.day);
  this.dateInsert = date;
  this.service.initialTichetHour = this.validfrom;
  this.dateInsert.setUTCHours(this.validto, 0, 0, 0);
  console.log(this.dateInsert)
}
  
  this.licenseplate = (<HTMLInputElement>document.getElementById("licenseplate")).value;
console.log('////////////////////////////////');
console.log(this.service.ServiceSpaceid,this.dateInsert,this.validfrom,this.validto,this.licenseplate,this.service.serviceIndividualSpcId);
 
  
    this.service.createtichet(this.service.ServiceSpaceid,this.dateInsert,this.validfrom,this.validto,this.licenseplate,this.service.serviceIndividualSpcId);
  
 
    

  
}

calculatetichetprice() {
  if(this.service.quickSpace!==null&&this.service.quickDate!==null&&this.service.qInitialHour!==null&&this.service.qValidToHour!==null){
    this.service.serviceIndividualSpcId=this.service.quickSpace;
  }

  const licensep=(<HTMLInputElement>document.getElementById("licenseplate")).value;
  console.log(licensep);
if(this.selectedDate===undefined){
  this.pricingAlertText="Select a date";
  this.open('content');
}



else if(licensep===''){
  this.pricingAlertText="Please fill in the license plate info";
  this.open('content');
}

 
  else{
  this.service.getAllTichets(null).subscribe(response => {
  
    const updatedReservations = [];
    console.log(this.selectedDate.day);
    const formattedDate: string = this.selectedDate.year.toString() + '-' + (this.selectedDate.month < 10 ? '0'+this.selectedDate.month.toString():this.selectedDate.month.toString()) + '-' +
    (this.selectedDate.day <  10 ? '0' + this.selectedDate.day.toString():this.selectedDate.day.toString());
    for (let index = 0; index < response.length; index++) {
      console.log((response[index].validtime).slice(0,10).toString()+'si'+formattedDate)
      
      if (response[index].spaceId===this.service.ServiceSpaceid&&response[index].individualSpaceId === this.service.serviceIndividualSpcId&&response[index].name!='EXPIRED'&&(response[index].validtime).slice(0,10).toString()===formattedDate) {
        
        
        updatedReservations.push(response[index]);
        
        for (let i = response[index].initialHour; i < (response[index].validtime).slice(11,13); i++) {
          this.InitialRedHours.push(i);
          
        }
      }
    }
  
   
    this.currentReservations = updatedReservations;
    console.log(this.currentReservations);
    
  });

  this.validto = this.validTime.hour;
  this.validfrom =  this.selectedTime.hour;

  if(this.validfrom>=this.validto){
    this.pricingAlertText="Wrong time interval";
    this.open('content');
  }

  else{
  if(this.selectedDate.day===this.CurrentTime.getDate()&&this.selectedDate.month===this.CurrentTime.getMonth()+1){
    

  if(this.validfrom<=this.CurrentTime.getHours()){
    this.pricingAlertText="We cannot estimate because the time interval has already passed";
    this.open('content');
  }
  
else{
  console.log(this.estimatepressed);
  this.service.getAllSpaces(this.service.ServiceSpaceid).subscribe(response => {
    
    this.price = response.price;
    this.price = this.price * Math.abs((this.validfrom-this.validto));
    this.service.payedfor = this.price;
    console.log(this.price);
  });
  
  if(Number.isNaN(this.price)){
    this.pricingAlertText="Please go back and select a suitable space and parking lot";
    this.open('content');
    this.estimatepressed = true;
  }
  else{
  this.estimatepressed = false;}
}
  }
else{

console.log(this.estimatepressed);
  this.service.getAllSpaces(this.service.ServiceSpaceid).subscribe(response => {
    
    this.price = response.price;
    this.price = this.price * Math.abs((this.validfrom-this.validto));
    this.service.payedfor = this.price;
    console.log(this.price);
  });
  
  if(Number.isNaN(this.price)){
    this.pricingAlertText="Please go back and select a suitable space and parking lot";
    this.open('content');
    this.estimatepressed = true;
  }
  
  else{
  this.estimatepressed = false;
}
}
}
}
}

}