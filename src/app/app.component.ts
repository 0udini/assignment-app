import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';
import { AuthentificationComponent } from './assignments/authentification/authentification.component';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatDialog } from '@angular/material/dialog';
import { AssignmentsService } from './shared/assignments.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Application de gestion de devoir à rendre';
  opened=true;  
  @ViewChild("myslide") myslide!: MatSlideToggle;
  constructor(private assignmentService:AssignmentsService,private authService:AuthService, private router:Router, public dialog: MatDialog) { }
  connected = this.authService.loggedIn;
  usernames!:String[];

  ngOnInit(): void {
    this.authService.getUserNames().subscribe(
      (data) => {
        this.usernames = data;
      }
    );
  }
  logout(){
    if(this.authService.isLoggedIn()){
      console.log("logout");
      this.authService.logOut();
      this.router.navigate(['/home']);
      window.location.reload();
      return this.connected;
    }
    else{
      this.dialog.open(AuthentificationComponent, {
        width: 'auto', height: 'auto',
        data: {name: '', password: ''}
    });
      return this.connected;
    }
  }

  isLoggedIn(){
   return this.authService.isLoggedIn();
  }


  populate(){
    this.authService
    this.assignmentService.populateDBWithForkJoin(this.usernames)
    .subscribe(a=>{console.log(a);
      console.log("POPULATE");
      window.location.reload()});
  }
  reset(){
    console.log("reset");
    this.assignmentService.resetDB();
  }
}
