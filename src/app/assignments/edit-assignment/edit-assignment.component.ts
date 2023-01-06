import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssignmentsService } from '../../shared/assignments.service';
import { Assignment } from '../assignment.model';
import { ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {

  assignmentTransmis!: Assignment;


  constructor(private assignmentsService:AssignmentsService,
    private route: ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
      this.getAssignment();   // this.getAssignment();
  }
  getAssignment(){
    const id = this.route.snapshot.params['id']!;
    this.assignmentsService.getAssignment(id).subscribe( (assignment) => 
      { 
        if (!assignment) return;
      this.assignmentTransmis = assignment;});
  }

  onSaveAssignment(){
    if (!this.assignmentTransmis) return;
    this.assignmentsService.updateAssignment(this.assignmentTransmis)
      .subscribe(message =>{console.log(message)
        this.router.navigate(['/home']);
      });
  }


}
