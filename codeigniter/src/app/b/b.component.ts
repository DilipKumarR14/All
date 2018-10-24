import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-b',
  templateUrl: './b.component.html',
  styleUrls: ['./b.component.css']
})
export class BComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
@Input() public parentData;
}
