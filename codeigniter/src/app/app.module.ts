import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule, MatIcon, MatIconModule } from '@angular/material';
import { NgModule } from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import 'hammerjs';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from "@angular/material/form-field";
import { LoginsComponent } from './logins/logins.component';
import {DatabaseService} from './service/database.service';
import {RouterModule} from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { ForgetComponent } from './forget/forget.component';
import { ResetsComponent } from './resets/resets.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LoginsComponent,
    ForgetComponent,
    ResetsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    MatCardModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,

  ],
  providers: [DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
    