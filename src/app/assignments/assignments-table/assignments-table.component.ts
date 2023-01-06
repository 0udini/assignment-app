import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { AuthentificationComponent } from '../authentification/authentification.component';

@Component({
  selector: 'app-assignments-table',
  templateUrl: './assignments-table.component.html',
  styleUrls: ['./assignments-table.component.css']
})
export class AssignmentsTableComponent implements AfterViewInit {

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private authService: AuthService,

  ) { }

  displayedColumns: string[] = ['select', 'nom', 'Date de rendu', 'rendu', 'auteur', 'actions'];
  dataSource!: MatTableDataSource<Assignment>;
  selection = new SelectionModel<Assignment>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // ngAfterViewInit(): void {
  //   this.assignmentsService.getAssignments().subscribe(assignments => {
  //     this.dataSource = new MatTableDataSource(assignments);
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;
  //   })

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit is called ');
    document.addEventListener('DOMContentLoaded', (event) => {
      console.log('DOM fully loaded and parsed');
      this.initializeAdminTable();
    });
  }


  localAssignments: Assignment[] = [];

  isAllSelected() {
    //console.log('this.selection : ', this.selection);
    if (this.dataSource === undefined) { return false }
    else {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  }


  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  isAdmin() {
    return this.authService.loggedAdmin();
  }
  isLogged() {
    return this.authService.isLoggedIn();
  }

  initializeAdminTable() {

    this.assignmentsService.getAssignments().subscribe(assignments => {
      
        this.localAssignments = assignments.filter(assignment => {
          if (this.authService.getCurrentUser().name === "admin") {
            return true;
          }
          else {
            return assignment.auteur === this.authService.getCurrentUser().name
          }
        });
        this.dataSource = new MatTableDataSource(this.localAssignments);
      
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item, property) => {
        //console.log('item : ', item.dateDeRendu);
        //console.log('property : ', property);
        switch (property) {
          case 'Date de rendu': {
            //console.log('dateDeRendu : ', item.dateDeRendu);
            return new Date(item.dateDeRendu);
          }
          default: return (item as any)[property];
        }

      };
      //console.log('this.dataSource is called ');
      this.paginator._intl.itemsPerPageLabel = 'Devoirs par page';
      this.paginator._intl.nextPageLabel = 'Page suivante';
      this.paginator._intl.previousPageLabel = 'Page précédente';

    });

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Assignment): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.nom}`;
  }

  deleteSelectedRows() {
    this.selection.selected.forEach(item => {
      this.assignmentsService.deleteAssignment(item).subscribe(
        //reload the table after deleting the assignment
        () => this.ngAfterViewInit(
        )
      );
    });
    this.selection = new SelectionModel<Assignment>(true, []);
    window.location.reload();
  }
  test(row: Assignment) {
    console.log(row.boiteDeRendu);
  }


  openLink(row: Assignment) {
    window.open(row.boiteDeRendu?.toString(), "_blank");
  }

  editAssignment(assignment: Assignment) {
    this.router.navigate(['assignment', assignment._id, 'edit']);
  }
  detailAssignment(assignment: Assignment) {
    this.router.navigate(['assignment', assignment._id]);
  }
}
