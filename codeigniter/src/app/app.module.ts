import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule, MatIconModule, MatDialogModule, MatNativeDateModule,MatCardModule,MatToolbarModule,MatSidenavModule,MatListModule,MatProgressSpinnerModule,MatProgressBarModule,MatTooltipModule,MatGridListModule,MatFormFieldModule,MatMenuModule,MatExpansionModule,MatDatepickerModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import 'hammerjs';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginsComponent } from './logins/logins.component';
import { DatabaseService } from './service/database.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule,HTTP_INTERCEPTORS } from "@angular/common/http";
import { ForgetComponent } from './forget/forget.component';
import { ResetsComponent } from './resets/resets.component';
import { EmailvalidateComponent } from './emailvalidate/emailvalidate.component';
import { FundooComponent } from './fundoo/fundoo.component';
import { FunComponent } from './fun/fun.component';
import { NotesComponent } from './notes/notes.component';
import { ReminderComponent } from './reminder/reminder.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { RoughComponent } from './rough/rough.component';
import { ArchiveComponent } from './archive/archive.component';
import { TrashComponent } from './trash/trash.component';
import { AddnoteComponent } from './addnote/addnote.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { NoteService } from './service/note.service';
import { CookieService } from "angular2-cookie";
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './service/auth-interceptor.service';
import { UpdatecardComponent } from './updatecard/updatecard.component';

@NgModule({
  declarations: [
    AppComponent, LoginComponent,  
    RegisterComponent, LoginsComponent, ForgetComponent,
    ResetsComponent, EmailvalidateComponent, FundooComponent,
    FunComponent, NotesComponent, ReminderComponent, RoughComponent,
    ArchiveComponent, TrashComponent, AddnoteComponent, DialogBoxComponent, UpdatecardComponent
  ], 
  imports: [
    BrowserModule, HttpClientModule, RouterModule,AppRoutingModule, FormsModule, MatCardModule,BrowserModule, BrowserAnimationsModule,   MatButtonModule, MatInputModule, MatCardModule, MatFormFieldModule, ReactiveFormsModule,
    MatIconModule, MatToolbarModule, MatSidenavModule,MatListModule, MatProgressSpinnerModule, MatProgressBarModule,MatMenuModule, NgxSpinnerModule, MatExpansionModule,MatDialogModule, MatTooltipModule, MatGridListModule, MatDatepickerModule,MatNativeDateModule, NgxMaterialTimepickerModule.forRoot(),MatExpansionModule,FlexLayoutModule
  ],
  entryComponents: [DialogBoxComponent,UpdatecardComponent],
  providers: [DatabaseService, CookieService, NoteService, AuthGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]  
})
export class AppModule { }