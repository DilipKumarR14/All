import { Component, Inject} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatIconRegistry} from '@angular/material';

export interface DialogData {
  label: string;
  name: string;
}

@Component({
  selector: 'app-fundoo',
  templateUrl: './fundoo.component.html',
  styleUrls: ['./fundoo.component.css'],
})

export class FundooComponent {
  label: string;
  name: string;
  panelOpenState=false;

  public user = "Dilip";
  public email = "dilipkumar14inc@gmail.com";


  isHandset: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,public dialog: MatDialog) { }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '25%',
      height:'35%',
      data: {name: this.name, label: this.label}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.label=result;
    });
  }



}

