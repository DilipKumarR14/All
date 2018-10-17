import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginsComponent } from './logins/logins.component';
import { ForgetComponent } from './forget/forget.component';
import {ResetsComponent} from './resets/resets.component';
import {EmailvalidateComponent} from './emailvalidate/emailvalidate.component';
import { FundooComponent } from './fundoo/fundoo.component';
import { FunComponent } from './fun/fun.component';
import { NotesComponent } from './notes/notes.component';
import { ReminderComponent } from './reminder/reminder.component';


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
          { path: 'valid',component:EmailvalidateComponent},
          { path: 'fundoo',component:FundooComponent},
          { path: 'fun',component:FunComponent,
        children:[
          {path:'note',component:NotesComponent},
          {path:'reminder',component:ReminderComponent}
        ]
        
        },
        

        ])
    ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }