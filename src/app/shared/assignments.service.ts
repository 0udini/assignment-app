import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { forkJoin, Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { bdInitialAssignments } from './data';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  constructor(private loggingService: LoggingService,
    private http: HttpClient,
    private authServive: AuthService) { }

  uri = "https://api-angular.herokuapp.com/api/assignments";

  getAssignment(id: String): Observable<Assignment> {
    return this.http.get<Assignment>(this.uri + '/' + id);
  }

  getAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.uri + '/all');
  }
  getAssignmentsPaginated(page: number, limit: number): Observable<any> {
    return this.http.get<any>(this.uri + "?page=" + page + "&limit=" + limit);
  }

  addAssignment(assignment: Assignment): Observable<any> {
    //this.loggingService.log(assignment.nom, "ajouté");
    //return of(this.assignments);
    return this.http.post<Assignment>(this.uri, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    //return of("Assignment service : assignments mis à jour");
    return this.http.put<Assignment>(this.uri, assignment);
  }
  deleteAssignment(assignment: Assignment): Observable<any> {
    //let pos = this.assignments.indexOf(assignment);
    //this.assignments.splice(pos,1);
    //return of("Assignment service : assignment supprimé");
    let deleteURI = this.uri + '/' + assignment._id;
    console.log("deleteURI " + deleteURI);
    return this.http.delete(deleteURI);
  }

  getRandomItem<T>(items: T[]): T {
    const index = Math.floor(Math.random() * items.length);
    return items[index];
  }



  populateDBWithForkJoin(usernames:String[]): Observable<any> {
    const appelsVersAddAssignment: any = [];
      bdInitialAssignments.forEach(a => {
        let newAssignment = new Assignment()
        newAssignment.nom = a.nom;
        newAssignment.dateDeRendu = new Date(a.dateDeRendu);
        newAssignment.rendu = a.rendu;
        newAssignment.auteur = this.getRandomItem<String>(usernames);
        newAssignment.note = a.note ? a.note : undefined;
        newAssignment.remarque = a.remarque ? a.remarque : "Pas de remarque";
        newAssignment.boiteDeRendu = a.boiteDeRendu ? a.boiteDeRendu : undefined;

        appelsVersAddAssignment.push(this.addAssignment(newAssignment));
      })
    
    return forkJoin(appelsVersAddAssignment)
  }

  resetDB() {
    console.log("resetDB ");
    const appelsVersDeleteAssignment: any = [];
    this.getAssignments()
      .subscribe(aToDelete => {
        aToDelete.forEach(a => {

          let deleteURI = this.uri + '/' + a._id;
          console.log(deleteURI);
          this.http.delete(deleteURI).subscribe(response => {
            console.log(response);
          })
        })

      });

  }

  //  resetDBWithForkJoin(): Observable<any> { { 
  //     const appelsVersDeleteAssignment:any = [];
  //     const assignmentsToDelete:Assignment[] = [];
  //     this.getAssignments().subscribe(next: assig);


  //   }}
  // }

  // (aToDelete => {
  //   aToDelete.forEach(a => {

  //     let deleteURI = this.uri + '/' + a._id;
  //     console.log(deleteURI);
  //     appelsVersDeleteAssignment.push(this.http.delete(deleteURI))
  //   })
  //   return forkJoin(appelsVersDeleteAssignment)
  // });


}