import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginsComponent } from './logins/logins.component';


@NgModule({
  imports:
    [
      RouterModule.forRoot(
        [
          { path: '', redirectTo: 'register', pathMatch: 'full' },
          { path: 'register', component: RegisterComponent },
          { path: 'logins',component:LoginsComponent}

        ])
    ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }