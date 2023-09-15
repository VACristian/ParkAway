import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TichetModel } from '../Models/tichet.model';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import jwt_decode from "jwt-decode";
import { Observable, from, switchMap, throwError } from 'rxjs';
import { SpaceModel } from '../Models/space.model';
import { IndividualSpace } from '../Models/individualspace.model';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';





@Injectable({
  providedIn: 'root'
})

//Putem observa faptul ca acesta clasa DataHandlerService urmeaza standardul de denumire si anume:UpperCamelCAse
export class DataHandlerService {
  
  constructor(public router: Router, public http: HttpClient, public fb: FormBuilder, private modalService:NgbModal) { }
  currentReservations: TichetModel[]=[]; //Aici putem observa faptul ca Array currentReservations de tip TichetModel este insantiat folosind brackets[]
  //Daca se folosea constructorul de Array() cu sau fara new putea duce la confuzii si la use case-uri contradictorii
  apihostvar: string = "http://localhost:5245/api/";
  localhostvar: string = "http://localhost:4200";
  tichetform: TichetModel;
  auth:string;
  decodedName: string="";
  decodedId: string=null;
  parkingtichetname:string = "";
  qrstring:string = "";
  qrhidden:boolean = true;
  ServiceSpaceid:any;
  serviceIndividualSpcId:any;
  hoursTillInvalid:number = 5;
  alertState:string;
  alertText:string;
  showLoginAndRegister:boolean = JSON.parse(sessionStorage.getItem('showLoginAndRegister'));
  userType:string = "Users";
  userAcc:string = "Users";
  currentActiveUser:any;
  hideAdminPanels:boolean=true;
  payedfor:number;
  initialTichetHour:number;
  //Quick park variables
  quickSpace:any=null;
  quickDate:NgbDateStruct=null;
  qInitialHour:any=null;
  qValidToHour:any=null;

  usersform = this.fb.group({
    
    
    Name: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
    LastName: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
    UserName: ["", [Validators.required, Validators.minLength(4)]],
    Email: ["", [Validators.required, Validators.minLength(2), Validators.email, Validators.maxLength(55)]],

    Passwords: this.fb.group({
      Password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(32)]],
      ConfirmPassword: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(32)]]
    }),

    Street: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(55)]],
    City: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
    StreetNumber: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(55)]],
    PhoneNumber: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(55)]]


  });
  loginform = {
    UserName: "",
    Password: ""
  }

  navigateto(path: string) {
    this.router.navigate([path])
  }

  redirectto(path: string) {
    window.location.href = "http://localhost:4200" + path;
  }

  

  

  onregister() {
    
      
    this.postuser().subscribe((result: any) => {
      if (result.succeeded) {
        console.log("Ceva merge");
        this.alertState="success";
        this.alertText = "Register succesfull!";
        setTimeout(e=>{
          this.modalService.dismissAll();
          this.navigateto("/login")
          
        },1000);
      }
      else {
        console.log("Ceva nu merge");
        console.log(result.errors);
          result.errors.forEach(element => {
            console.log(element.code);
            switch (element.code) {
              case "DuplicateUserName": console.log("S-a mai bagat o data(username) ");
              this.alertState="danger";
              this.alertText = "Already registered(username)";
               break;
              case "DuplicateEmail": console.log("S-a mai bagat o data(email)");
              this.alertState="danger";
              this.alertText = "Already registered(email)"; 
              break;
              default: break;

            }
            

          });
        
            

      }
    }, err => { console.log(err)})
    this.usersform.reset();
  
   
   
  }

  postuser() {
    //Putem observa utilizrea var care nu este recomandata(ceea ce aflu acum citind standardul) se recomanda const sau let,pentru ca var poate aduce complicatii
    //Voi schimba si voi testa cu let peste tot unde am folosit var in viitorul apropiat
    var bodyregister = {
      
      Name: this.usersform.value.Name,
      LastName: this.usersform.value.LastName,
      Username: this.usersform.value.UserName,
      Email: this.usersform.value.Email,
      Password: this.usersform.value.Passwords!.Password,
      Street: this.usersform.value.Street,
      City: this.usersform.value.StreetNumber,
      StreetNumber: this.usersform.value.StreetNumber,
      PhoneNumber: this.usersform.value.PhoneNumber,
      userTypeAcc:this.userType
    }

    const values = Object.values(bodyregister);
    if (values.every(value => value)) {
      // All values are truthy (i.e. not null or undefined)
      if(bodyregister.Password!=this.usersform.value.Passwords!.ConfirmPassword){
        console.log("Password do not match!");
        this.alertState="danger";
        this.alertText = "Password do not match!";
        return null;
      }
      
      else{
          return this.http.post(this.apihostvar + 'Users/register', bodyregister);
      }
        
      
    } else {
      this.alertState="danger";
      this.alertText = "Please fill all fields!";
      console.log("Please fill all fields!");
      return null;
    }

  }


loginuser(form){
  
  return this.http.post(this.apihostvar + 'Users/login',form);
  
}




onlogin(form:NgForm){
 
  sessionStorage.setItem('showLoginAndRegister','false');
  
  this.showLoginAndRegister = JSON.parse(sessionStorage.getItem('showLoginAndRegister'));
  console.log(this.showLoginAndRegister);
  this.loginuser(form.value).subscribe((result: any)=>{
    
    localStorage.setItem("token",result.token);
    this.alertState = "success";
    this.alertText = "Login successfull!"
    
    this.GetDecodedToken();
    
    
      
    setTimeout(e=>{
      
      this.router.navigateByUrl("/home");
        
    },1000)
    
    
    
    
  },
  err=>{if(err.status==400){
    this.alertState = "danger";
    this.alertText =  "Login failed,user or pass are wrong!";
    console.log("User or pass are wrong,or you are not registered!");

  }
  else{
    console.log(err);
  }
}
  )

}


getUserById(){
  return this.http.get<any>(this.apihostvar+'Users/'+this.decodedId).subscribe((response)=>{
    
     
    
    this.currentActiveUser = response;
    console.log(this.currentActiveUser);
    console.log(typeof(this.currentActiveUser));
    this.userAcc = this.currentActiveUser.userTypeAcc;
    console.log(this.userAcc)
    if(this.userAcc=='Admins'){
      this.hideAdminPanels = false;
    }
    else{
    this.hideAdminPanels = true;
    }
    console.log(this.hideAdminPanels)
      
   
    
  
    
  },);
}

GetDecodedToken(){
  var tokendata = localStorage.getItem('token');
  try{
    var decodedtoken = jwt_decode(tokendata);
    localStorage.setItem('decodedname', decodedtoken['Name']);
    this.decodedName = decodedtoken['Name'];
    
    this.decodedId = decodedtoken['Id'];
    return decodedtoken;
    
  }catch(Error){
    return null;
  }
}

logoutuser(){
  
  return this.http.post(this.apihostvar + 'Users/logout','loggedout');
}
onlogoutuser(){
  sessionStorage.setItem('showLoginAndRegister','true')
  
    this.showLoginAndRegister = JSON.parse(sessionStorage.getItem('showLoginAndRegister'));
    console.log(this.showLoginAndRegister);
  
  console.log( this.GetDecodedToken()['Name']);
  
  this.logoutuser().subscribe((result: any)=>{
    
    localStorage.setItem("token",null);
    
    this.userAcc = "Users";
    this.hideAdminPanels = true;
    this.decodedName = null;
    this.decodedId = null;
    this.router.navigateByUrl("/login");
    
    
    
    
  },
  err=>{if(err.status==400){
    console.log("Eroare")

  }
  else{
    console.log(err);
  }
}
  )
}

//Tichets:

createtichet(spid:number,Datestring:Date,hour1:any,hour2:any,license:string,individualSpcId:number) {
    

  
  this.getAllSpaces(spid).subscribe(response => {
    //Putem observa ca aici in denumirea acestei constante si anume 'rps' nu am urmat standardul de codare,ideal ea ar fi trebuit denumita:'SPACE_RESPONSE'
    
    const rps = response;
    
    
    this.getAllTichets(null).subscribe(response => {
      // Array care sa contina rezervarile
      const updatedReservations = [];
    
      for (let index = 0; index < response.length; index++) {
        if (response[index].individualSpaceId === individualSpcId&&response[index].name!='EXPIRED') {
          
          updatedReservations.push(response[index]);
        }
      }
    
      // Updatam var current rezervations la array-ul cu rezervarile adaugate in for loop
      this.currentReservations = updatedReservations;
      console.log(this.currentReservations);
    });
    

    const insertedDate = new Date(Datestring);
    insertedDate.setDate(insertedDate.getDate()+1)
    
   
    
    this.tichetform = {
    
      tichetId: 0,
      name: "Ticket#"+Math.floor(Math.random() * insertedDate.getDate())+Math.floor(Math.random() * insertedDate.getHours())+Math.floor(Math.random() * insertedDate.getMinutes()),
      location:rps.location,
      licensePlate: license,
      qrCode: 'VALID',
      isValid: true,
      validtime: insertedDate,
      userId: this.decodedId,
      spaceId: spid,
      payed:this.payedfor,
      initialHour:this.initialTichetHour,
      individualSpaceId:individualSpcId 
    }
    console.log(this.tichetform.validtime);
  });
  this.GetDecodedToken();
  
  
  setTimeout(e=>{
    if(spid!=null&&this.decodedId!=null){
      var taken:boolean = false;
      for (let i = 0; i < this.currentReservations.length; i++) {
        console.log('1'+((this.tichetform.validtime).toISOString()).slice(0,19));
        console.log('2'+(this.currentReservations[i].validtime).toString());
        if ((this.currentReservations[i].validtime).toString() === ((this.tichetform.validtime).toISOString()).slice(0,19) ){
          taken = true;
          console.log('Rezervat deja');
          console.log(this.tichetform.validtime, this.currentReservations[i].validtime);
          break; 
        }
      
      
        
        
        }
    
       if(!taken){
        console.log('post')
          
            this.posttichet().subscribe(
              res => { }, (err) => { console.log(err);
              
              });
          
           
          this.redirectto('/mytichets')
          
          }
      }
      
        
    
        else if(this.decodedId!=null){
          console.log("No space selected");
        }
      
        else{
          console.log("Not logged in!");
        }
     

  },10)
 
}

posttichet() {

  return this.http.post(this.apihostvar +'ParkingTichets/create-tichet', this.tichetform);
}






getAllTichets(FillToGetById:any) :Observable<any>{
  
  if(FillToGetById!=null){
  
    return this.http.get<any>(this.apihostvar +'ParkingTichets/'+FillToGetById);
  }
  else{
    return this.http.get<any>(this.apihostvar +'ParkingTichets');
  }
   
}



//Spaces:

//post simplu la un space realizat in manage spaces pe un var care include necesarele(space)
postSpace(space: any) {
  
  
  return this.http.post<SpaceModel>(this.apihostvar + 'ParkingSpaces', space);
  
}

//post la spatiu individual care este realizat atunci cand se creaza tichetul si este initializat cu id-ul spatiului care ii aprtine+off by default si id generat
postIndividualSpace(spcId:any) {
  var indvSpace={
    id:0,
    isFull:false,
    spaceId:spcId

  }
  return this.http.post(this.apihostvar + 'IndividualSpaces', indvSpace);
}


//put care va updata spatiul singular pe care se ia un tichet de parcare(trebuie facuta logica ca acesta sa devina ocupat/rezervat pe ziua respectiva)
putSpace(spid: any,indspcid:any) {
 
   
      
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const urlIndv = `${this.apihostvar}IndividualSpaces/${indspcid}`;
      
     
        const INDVD_SPACE = {
          id:indspcid,
          isFull:true,
          spaceId:spid
        }
        
     
        
          
       
     
        
      
      
       
        return this.http.put(this.apihostvar +'IndividualSpaces/'+indspcid,INDVD_SPACE);
    
  
}


verifyIndSpace(IndSpaceId:any){
  return this.http.get<IndividualSpace>(this.apihostvar + 'IndividualSpaces/'+IndSpaceId);
}




updateSpace(spid: number, space: any): Observable<any> {
  //Este recomandata folosirea '===' in loc de '==' datorita suscebilitatii la erori si la implementarea pentru JavaScript Virtual Machines
  if(spid===undefined){
    console.log("Select a space to update!")
    return null;
  }
  ;
  return this.http.get<any>(this.apihostvar+'ParkingSpaces/'+spid).pipe(
    //In acest caz se recomnda utilizarea functiilor => in loc de function() (aici se poate observa spacerps)
    switchMap(spacerps => {
      const spacebody = {
        spaceId: spid,
        name: space.name||spacerps.name,
        description: space.description || spacerps.description,
        location: space.location || spacerps.location,
        isFull: space.isFull === undefined ? spacerps.isFull : space.isFull,
        parkingSlots: space.parkingSlots || spacerps.parkingSlots,
        price:space.price || spacerps.price,
        lat:space.lat || spacerps.lat,
        lng:space.lng || spacerps.lng,
      };
      
        return this.http.put<any>(this.apihostvar+'ParkingSpaces/'+spid, spacebody);
      
    })
  );
}




deleteSpace(id:number){
  this.http.delete(this.apihostvar+'ParkingSpaces/'+id).subscribe((response)=>{
    console.log("Deleted"+response);
  })
}

//Subscribe in ngoninit unde este nevoie de spatii(la fel pt celelalte)
getAllSpaces(id:number): Observable<any> {
  if(id!=null){
  
  return this.http.get<any>(this.apihostvar + 'ParkingSpaces/'+id);}
  else{
    return this.http.get<any>(this.apihostvar + 'ParkingSpaces');}
  }

  getAllIndividualSpaces(): Observable<any> {
  
    
      return this.http.get<any>(this.apihostvar + 'IndividualSpaces');
    

}




}