import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginsComponent } from './logins/logins.component';
import { ForgetComponent } from './forget/forget.component';
import {ResetsComponent} from './resets/resets.component';

@NgModule({
  imports:
    [
      RouterModule.forRoot(
        [
          { path: '', redirectTo: 'register', pathMatch: 'full' },
          { path: 'register', component: RegisterComponent },
          { path: 'logins',component:LoginsComponent},
          { path: 'forget',component:ForgetComponent},
          { path: 'resets',component:ResetsComponent},
        ])
    ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }