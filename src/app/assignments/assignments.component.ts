import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  
  formVisible=false;
  visibleCard = true;
  assignments!:Assignment[];

  assignmentSelectionne!:Assignment;


  page: number = 1;
  limit: number = 5;
  totalDocs?: number;
  totalPages?: number;
  hasPrevPage?: boolean;
  hasNextPage?: boolean;
  prevPage?: number;
  nextPage?: number;

  constructor(private assignmentsService:AssignmentsService) { }

  ngOnInit(): void {
  //  this.assignmentsService.getAssignments()
  //  .subscribe(tableauDesAssignmentsObservable => {
  //   this.assignments = tableauDesAssignmentsObservable
  //  });
    this.assignmentsService.getAssignmentsPaginated(this.page, this.limit).subscribe(data => {
      this.assignments = data.docs;
      this.page = data.page;
      this.limit = data.limit;
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.hasPrevPage = data.hasPrevPage;
      this.hasNextPage = data.hasNextPage;
      this.prevPage = data.prevPage;
      this.nextPage = data.nextPage;
    })
  }


  onAssignmentClicke(assignment:Assignment) {
    this.assignmentSelectionne = assignment;
    this.visibleCard=true;
  }

  onAddAssignmentBtnClick() {
    //this.formVisible = true;
  }
/*
  onNouvelAssignment(assignment:Assignment) {
    //this.assignments.push(assignment);
    this.assignmentsService.addAssignment(assignment).subscribe(message =>console.log(message));
    this.formVisible = false;
  }
  */
  onDeleteAssignment(assignment:Assignment) {
    this.assignmentsService.deleteAssignment(assignment).subscribe(message =>console.log(message));
    this.visibleCard = false;
  }
}
