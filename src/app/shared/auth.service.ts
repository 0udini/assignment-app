import { Injectable, OnInit } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(

    private http: HttpClient
  ) { }
  loggedIn = false;
  uriprefix = "https://api-angular.herokuapp.com/api";
  uri = this.uriprefix + "/users";
  currentUser!: User;

  addUser(user: User) {
    return this.http.post<User>(this.uri, user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.uri + '/all');
  }

  getUserByName(name: String): Observable<User> {
    return this.http.get<User>(this.uri + '/name/' + name);
  }


  getUserNames(): Observable<String[]> {
    return this.http.get<String[]>(this.uriprefix + '/usernames');
  }

  getCurrentUser(): User {
    return localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!) : null;
  }
  
  isLoggedIn() {
    return (localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!) : null) != null;
  }
  logOut() {
    localStorage.removeItem('currentUser');
  }

  loggedAdmin() {
    return (localStorage.getItem('loggedIn') == 'true') && (localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!).name == "admin" : false);
  }

  isAdmin() {
    const isUserAdmin = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedAdmin());
        }, 800);
      }
    );
    return isUserAdmin;
  }
      



}
