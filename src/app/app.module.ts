import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AuthGuard } from './shared/auth.guard';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AssignmentsDetailsComponent } from './assignments/assignments-details/assignments-details.component';
import { RenduDirective } from './shared/rendu.directive';
import { FormsModule } from '@angular/forms';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {RouterModule, Routes} from '@angular/router';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { AssignmentsService } from './shared/assignments.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AuthentificationComponent } from './assignments/authentification/authentification.component';
import { AuthService } from './shared/auth.service';
import {MatDialogModule} from '@angular/material/dialog';
import { AssignmentsTableComponent } from './assignments/assignments-table/assignments-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { DashboardComponent } from './assignments/dashboard/dashboard.component';


const routes:Routes = [
  {path:'',component:DashboardComponent},
  {path:'home',component:DashboardComponent},
  {path:'assignmentList',component:AssignmentsComponent},
  {path:'add',component:AddAssignmentComponent},
  {path:'assignment/:id',component:AssignmentsDetailsComponent},
  //{path:'assignment/:id/edit',component:EditAssignmentComponent},
  {path:'assignment/:id/edit', component:EditAssignmentComponent, canActivate:[AuthGuard]},

]

@NgModule({


  declarations: [
    AppComponent,
    AssignmentsComponent, AssignmentsDetailsComponent,
    RenduDirective,
    AddAssignmentComponent,
    EditAssignmentComponent,
    AuthentificationComponent,
    AssignmentsTableComponent,
    DashboardComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatIconModule, MatDividerModule,
    MatInputModule, MatFormFieldModule,
    MatDatepickerModule, MatNativeDateModule, MatListModule,
    MatCardModule, MatCheckboxModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    RouterModule.forRoot(routes),
    MatSlideToggleModule,
    HttpClientModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
