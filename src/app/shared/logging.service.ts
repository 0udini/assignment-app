import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }
  log(assignmentName:string, action:string){
    console.log("Assignment" + assignmentName + " " + action);
  }
  logCred(credName:string, credPwd:string){
    console.log("Credential : Name :" + credName + " Pwd :" + credPwd);
  }
  logTest(action:string, result:boolean){
    console.log("Test " + action + " resulted : " + result);
  }
}
