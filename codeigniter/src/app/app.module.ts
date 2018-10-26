import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule, MatIconModule, MatDialogModule, MatNativeDateModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import 'hammerjs';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from "@angular/material/form-field";
import { LoginsComponent } from './logins/logins.component';
import { DatabaseService } from './service/database.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { ForgetComponent } from './forget/forget.component';
import { ResetsComponent } from './resets/resets.component';
import { EmailvalidateComponent } from './emailvalidate/emailvalidate.component';
import { FundooComponent } from './fundoo/fundoo.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FunComponent } from './fun/fun.component';
import { NotesComponent } from './notes/notes.component';
import { ReminderComponent } from './reminder/reminder.component';
import { MatMenuModule } from '@angular/material/menu';
import { NgxSpinnerModule } from "ngx-spinner";
import { MatExpansionModule } from '@angular/material/expansion';
import { RoughComponent } from './rough/rough.component';
import { ArchiveComponent } from './archive/archive.component';
import { TrashComponent } from './trash/trash.component';
import { AddnoteComponent } from './addnote/addnote.component';
import { AComponent } from './a/a.component';
import { BComponent } from './b/b.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { NoteService } from './service/note.service';
import { CookieService } from "angular2-cookie";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

@NgModule({
  declarations: [
    AppComponent,LoginComponent,
    RegisterComponent,LoginsComponent,ForgetComponent,
    ResetsComponent,EmailvalidateComponent,FundooComponent,
    FunComponent,NotesComponent,ReminderComponent,RoughComponent,
    ArchiveComponent,TrashComponent,AddnoteComponent,AComponent,
    BComponent,DialogBoxComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,RouterModule,
    AppRoutingModule,FormsModule, MatCardModule,
    BrowserModule,BrowserAnimationsModule,
    MatButtonModule,MatInputModule,MatCardModule,
    MatFormFieldModule,ReactiveFormsModule,
    MatIconModule,MatToolbarModule,MatSidenavModule,
    MatListModule,MatProgressSpinnerModule, MatProgressBarModule,
    MatMenuModule,NgxSpinnerModule,MatExpansionModule,
    MatDialogModule,MatTooltipModule,MatGridListModule,MatDatepickerModule,
    MatNativeDateModule,NgxMaterialTimepickerModule.forRoot(),
  ],
  entryComponents: [DialogBoxComponent],
  providers: [DatabaseService, CookieService, NoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
