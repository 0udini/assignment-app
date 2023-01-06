import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private assignmentsService: AssignmentsService,
    private authService: AuthService,
    private router: Router
  ) { }

  assigmentsEnRetard: Assignment[] = [];
  assigmentsPourLaSemaine: Assignment[] = [];
  assigmentsPourLeMois: Assignment[] = [];

  ngOnInit(): void {
    this.assignmentsService.getAssignments().subscribe(
      (allUsersAssignments) => {
        const assignments = allUsersAssignments.filter(assignment => assignment.auteur === this.authService.getCurrentUser().name);
        this.assigmentsEnRetard = assignments.filter(assignment => assignment.rendu === false && new Date(assignment.dateDeRendu) < new Date());
        this.assigmentsPourLaSemaine = assignments.filter(assignment => assignment.rendu === false && new Date(assignment.dateDeRendu) > new Date() && new Date(assignment.dateDeRendu) < new Date(new Date().setDate(new Date().getDate() + 7)));
        this.assigmentsPourLeMois = assignments.filter(assignment => assignment.rendu === false && new Date(assignment.dateDeRendu) >= new Date(new Date().setDate(new Date().getDate() + 7)) && new Date(assignment.dateDeRendu) < new Date(new Date().setDate(new Date().getDate() + 30)));
        this.assigmentsEnRetard = this.sortAssignmentsByDate(this.assigmentsEnRetard);
        this.assigmentsPourLaSemaine = this.sortAssignmentsByDate(this.assigmentsPourLaSemaine);
        this.assigmentsPourLeMois = this.sortAssignmentsByDate(this.assigmentsPourLeMois);
      }
    )

   
  }
  sortAssignmentsByDate(assignments: Assignment[]) {
    return assignments.sort((a, b) => new Date(a.dateDeRendu).getTime() - new Date(b.dateDeRendu).getTime());
  }

  goToAssignment(assignment: Assignment) {
    this.router.navigate(['/assignments', assignment._id]);
  }

}
