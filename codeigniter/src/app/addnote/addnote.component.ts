import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-addnote',
  templateUrl: './addnote.component.html',
  styleUrls: ['./addnote.component.css']
})
export class AddnoteComponent implements OnInit {

  // public items = [1];

  @Input() public title;
  @Input() public note;
  
  constructor() { }

  ngOnInit() {
  }

}
