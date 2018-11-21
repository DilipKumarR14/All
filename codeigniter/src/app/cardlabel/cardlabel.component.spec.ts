import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardlabelComponent } from './cardlabel.component';

describe('CardlabelComponent', () => {
  let component: CardlabelComponent;
  let fixture: ComponentFixture<CardlabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardlabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardlabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
