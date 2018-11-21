import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-fun',
  templateUrl: './fun.component.html',
  styleUrls: ['./fun.component.css']
})
export class FunComponent {
//$
  isHandset: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe( map(result => result.matches)
    );
    
  constructor(private breakpointObserver: BreakpointObserver) {}
       
  }
