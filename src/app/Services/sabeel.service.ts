import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AboutSabeelModule } from '../Models/about-sabeel/about-sabeel.module';
import { ContactsModule } from '../Models/contacts/contacts.module';
import { TeamMemberModule } from '../Models/team-member/team-memebr.module';
import { EventModule } from '../Models/event/event.module';
import { OnInit } from '@angular/core';
import { ServerResponseModule } from '../DTO/server-response/server-response.module';
import { ImageModule } from '../Models/image/image.module';

@Injectable({
  providedIn: 'root'
})
export class SabeelService implements  OnInit{

  url:string = "https://localhost:7089/api/";
  public  aboutSabeel:AboutSabeelModule = new AboutSabeelModule();
  public contacts:ContactsModule = new ContactsModule();
  public team:TeamMemberModule[] = new Array<TeamMemberModule>();
  public events: EventModule[] = new Array<EventModule>(); 



  constructor(private httpClint:HttpClient) { this.ngOnInit()}
  ngOnInit(){
    this.getAboutSabeel();
    this.getContacts();
    this.getTeam();
    this.getEvents();
  }
  // get methods
  getAboutSabeel(){
     this.httpClint.get(`${this.url}Details/GetById/1`).subscribe((data)=>{
      const response = data as ServerResponseModule;
      if(response.isSuccess==true)
      {
        this.aboutSabeel = response.data as AboutSabeelModule;
      }
      else{
        console.log(response.message);
      }
     });
  }
  getAboutSabbelObservable(){
    return this.httpClint.get(`${this.url}Details/GetById/1`);
  }
  getContacts(){
     this.httpClint.get(`${this.url}Contacts/GetById/1`).subscribe((data)=>{
      const response = data as ServerResponseModule;
      if(response.isSuccess==true)
      {
        this.contacts = response.data as ContactsModule;
      }
      else{
        console.log(response.message);
      }
     });
  }
  getContactsObservable(){
    return this.httpClint.get(`${this.url}Contacts/GetById/1`);
  }
  getTeam(){
     this.httpClint.get(`${this.url}Teem/GetAll`).subscribe((data)=>{
      const response = data as ServerResponseModule;
      if(response.isSuccess==true)
      {
        this.team = response.data as TeamMemberModule[];
      }
      else{
        console.log(response.message);
      }
     });
  }
  getTeamObservable(){
    return this.httpClint.get(`${this.url}Teem/GetAll`);
  }
  getEvents(){
     this.httpClint.get(`${this.url}Events/GetAll`).subscribe((data)=>{
      const response = data as ServerResponseModule;
      if(response.isSuccess==true)
      {
        this.events = response.data as EventModule[];
      }
      else{
        console.log(response.message);
      }
     });
  }
  getEventsObservable(){
    return this.httpClint.get(`${this.url}Events/GetAll`);
  }

  //add delete and update methods for events
  addEvent(event:EventModule, imageBlob:Blob){
    this.httpClint.post(`${this.url}Events/Add`, event).subscribe((data) => {
      const response = data as ServerResponseModule;
      if (response.isSuccess == true) {
        const formData: FormData = new FormData();
        formData.append('file', imageBlob); // Adjust filename as needed
        this.httpClint.post(`${this.url}Image/Upload-Image-Event/${response.data.id}`, formData).subscribe((data) => {
          const response = data as ServerResponseModule;
          if (response.isSuccess == true) {
            this.getEvents();
          } else {
            console.log(response.message);
          }
        });
        this.getEvents();
      } else {
        console.log(response.message);
      }
    });
  }
  deleteEvent(id:number){
     this.httpClint.delete(`${this.url}Events/Delete/${id}`).subscribe((data)=>{
      const response = data as ServerResponseModule;
      if(response.isSuccess==true)
      {
        this.getEvents();
      }
      else{
        console.log(response.message);
      }
     });
  }
  updateEvent(event:EventModule){
    return this.httpClint.put(`${this.url}Events/Update`,event).subscribe((data)=>{
      const response = data as ServerResponseModule;
      if(response.isSuccess==true)
      {
        this.getEvents();
      }
      else{
        console.log(response.message);
      }
     });
  }

  //add delete and update methods for Team
  addTeamMember(member:TeamMemberModule, imageBlob:Blob){
     this.httpClint.post(`${this.url}Teem/Add`,member).subscribe((data)=>{
      const response = data as ServerResponseModule;
      if(response.isSuccess==true)
      {
        const formData: FormData = new FormData();
        formData.append('file', imageBlob); // Adjust filename as needed
        this.httpClint.post(`${this.url}Image/Upload-Image-Member/${response.data.id}`, formData).subscribe((data)=>{
          const response = data as ServerResponseModule;
          if(response.isSuccess==true)
          {
            this.getTeam();
          }
          else{
            console.log(response.message);
          }
           this.getTeam();
        });
      }
      else{
        console.log(response.message);
      }
     });
  }
  deleteTeamMember(id:number){
    return this.httpClint.delete(`${this.url}Teem/Delete/${id}`).subscribe((data)=>{
      const response = data as ServerResponseModule;
      if(response.isSuccess==true)
      {
        this.getTeam();
      }
      else{
        console.log(response.message);
      }
     });
  }
  updateTeamMember(member:TeamMemberModule){
    return this.httpClint.put(`${this.url}Teem/Update`,member).subscribe((data)=>{
      const response = data as ServerResponseModule;
      if(response.isSuccess==true)
      {
        this.getTeam();
      }
      else{
        console.log(response.message);
      }
     });
  }

  // update Sabeel details
  updateAboutSabeel(about:AboutSabeelModule){
    console.log(about);
    return this.httpClint.put(`${this.url}Details/Update`,about).subscribe((data)=>{
      const response = data as ServerResponseModule;
      if(response.isSuccess==true)
      {
        this.getAboutSabeel();
      }
      else{
        console.log(response.message);
      }
     });
  }

  // Add delete and update contacts
  addContact(contact:ContactsModule){
    return this.httpClint.post(`${this.url}Contacts/Add`,contact).subscribe((data)=>{
      const response = data as ServerResponseModule;
      if(response.isSuccess==true)
      {
        this.getContacts();
      }
      else{
        console.log(response.message);
      }
     });
  }
  deleteContact(id:number){
    return this.httpClint.delete(`${this.url}Contacts/Delete/${id}`).subscribe((data)=>{
      const response = data as ServerResponseModule;
      if(response.isSuccess==true)
      {
        this.getContacts();
      }
      else{
        console.log(response.message);
      }
     });
  }
  updateContact(contact:ContactsModule){
    return this.httpClint.put(`${this.url}Contacts/Update`,contact).subscribe((data)=>{
      const response = data as ServerResponseModule;
      if(response.isSuccess==true)
      {
        this.getContacts();
      }
      else{
        console.log(response.message);
      }
     });
  }


  

}
