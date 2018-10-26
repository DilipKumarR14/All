import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginsComponent } from './logins/logins.component';
import { ForgetComponent } from './forget/forget.component';
import { ResetsComponent } from './resets/resets.component';
import { EmailvalidateComponent } from './emailvalidate/emailvalidate.component';
import { FundooComponent } from './fundoo/fundoo.component';
import { FunComponent } from './fun/fun.component';
import { NotesComponent } from './notes/notes.component';
import { ReminderComponent } from './reminder/reminder.component';
import { RoughComponent } from './rough/rough.component';
import { ArchiveComponent } from './archive/archive.component';
import { TrashComponent } from './trash/trash.component';
import { AddnoteComponent } from './addnote/addnote.component';
import { AComponent } from './a/a.component';
import { BComponent } from './b/b.component';


@NgModule({
  imports:
    [
      RouterModule.forRoot(
        [
          { path: '', redirectTo: 'register', pathMatch: 'full' },
          { path: 'register', component: RegisterComponent },
          { path: 'logins', component: LoginsComponent },
          { path: 'forget', component: ForgetComponent },
          { path: 'resets', component: ResetsComponent },
          { path: 'valid', component: EmailvalidateComponent },
          {
            path: 'fundoo', component: FundooComponent,
            children: [{
              path: 'note', component: NotesComponent,
              children: [{
                path: 'addnote', component: AddnoteComponent
              }]
            },
            { path: 'reminder', component: ReminderComponent },
            { path: 'archive', component: ArchiveComponent },
            { path: 'trash', component: TrashComponent },
            ]
          },
          //   { path: 'fun',component:FunComponent,
          // children:[
          //   {path:'note',component:NotesComponent},
          //   {path:'reminder',component:ReminderComponent}
          // ]

          // },
          { path: 'rough', component: RoughComponent },
          { path: 'addnote', component: AddnoteComponent },
          { path: 'a', component: AComponent },
          { path: 'b', component: BComponent },
        ])
    ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }