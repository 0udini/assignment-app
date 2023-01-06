import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  // emetteur de l'événementy (nouvelAssignment)
  //@Output() nouvelAssignment = new EventEmitter<Assignment>();
  
  // du formulaire
  nomDevoir: string = '';
  dateDeRendu!: Date;
  urlDevoir: string = '';
  remarque: string = '';
  noteDevoir!: number;

  constructor(private assignmentsService:AssignmentsService,
    private authService:AuthService
    ) {}

  ngOnInit(): void {}

  onSubmit() {
    const newAssignment = new Assignment();
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = new Date(this.dateDeRendu);
    newAssignment.rendu = false;
    newAssignment.boiteDeRendu = this.urlDevoir;
    newAssignment.remarque = this.remarque;
    newAssignment.note = this.noteDevoir;

    console.log(newAssignment);
    //this.assignments.push(newAssignment);
    //this.nouvelAssignment.emit(newAssignment);
    this.assignmentsService.addAssignment(newAssignment).subscribe(response =>console.log(response.message));
  }
  isLoggedIn(){
    return this.authService.isLoggedIn();
  }
}
