import { Component, Injectable } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { User } from 'src/app/shared/user.model';
import { LoggingService } from 'src/app/shared/logging.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class AuthentificationComponent{

  constructor(private authService: AuthService, private log: LoggingService) { }

  pseudo: string = '';
  mdp: string = '';

  errorMessage: string = '';


  tryToLogIn(user: User) {
    this.authService.getUserByName(user.name).subscribe(
      (userFound) => {
        if (userFound) {
          if (userFound.password == user.password) {
            localStorage.setItem('currentUser', JSON.stringify(userFound));
            this.authService.currentUser = userFound;
            console.log("current user :",localStorage.getItem('currentUser'));
            console.log("Connexion réussie");
            window.location.reload();
          }
          else {
            this.errorMessage = "Mot de passe incorrect";
          }
        }
        else {
          this.errorMessage = "Utilisateur non trouvé";
        }
      }
    )
  }
  onClickAuth() {
    const cred = new User();
    cred.name = this.pseudo;
    cred.password = this.mdp;
    this.tryToLogIn(cred);

  }
  newUser() {
    const cred = new User();
    cred.name = this.pseudo;
    cred.password = this.mdp;
    this.authService.getUserNames().subscribe(
      (usersNames) => {
        if (usersNames.includes(cred.name)) {
          this.errorMessage = "Ce nom d'utilisateur est déjà pris";
        }
        else {
          this.authService.addUser(cred).subscribe(
            (userAdded) => {
              console.log("Utilisateur ajouté");
            }
          )
        }
      }
    )

  }
  

}
