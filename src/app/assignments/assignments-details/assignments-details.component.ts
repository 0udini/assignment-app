import { Component, EventEmitter, Input, OnInit, Output, AfterViewInit, ViewChildren  } from '@angular/core';
import { AssignmentsService } from '../../shared/assignments.service';
import { Assignment } from '../assignment.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { Subscription } from 'rxjs';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-assignments-details',
  templateUrl: './assignments-details.component.html',
  styleUrls: ['./assignments-details.component.css'],
})

export class AssignmentsDetailsComponent implements OnInit {
  @Input() assignmentTransmis!: Assignment;
  @Output() onAssignmentSupprime = new EventEmitter<Assignment>();
  @ViewChildren(MatCheckbox) myCheckbox!: MatCheckbox;
  
  constructor(private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

 
  
  ngOnInit(): void {
    this.getAssignment();

  }



  onAssignmentRendu() {

    this.assignmentTransmis.rendu = !this.assignmentTransmis.rendu;

    this.assignmentsService.updateAssignment(this.assignmentTransmis)
      .subscribe(message => {
        console.log(message)
      });

  }

  onDelete() {
    this.assignmentsService.deleteAssignment(this.assignmentTransmis)
      .subscribe(message => {
        console.log(message)
        this.router.navigate(['/home']);
      });

  }

  getAssignment() {
    // const id = (window.location.href.slice(window.location.href.lastIndexOf('/') + 1));
    
    const id = this.route.snapshot.params['id']!;
    console.log("id : " + id);
    this.assignmentsService.getAssignment(id)
      .subscribe(assignment => {
        this.assignmentTransmis = assignment;
        this.myCheckbox.checked = this.assignmentTransmis.rendu;
         //this.myCheckbox.checked = this.assignmentTransmis.rendu;
        }
         );

  }

  isAdmin() {
    return this.authService.isLoggedIn() && this.authService.isAdmin();
  }

  openLink(row: Assignment) {
    window.open(row.boiteDeRendu?.toString(), "_blank");
  }

}
