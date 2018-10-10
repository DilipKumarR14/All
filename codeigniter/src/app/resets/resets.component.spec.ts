import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetsComponent } from './resets.component';

describe('ResetsComponent', () => {
  let component: ResetsComponent;
  let fixture: ComponentFixture<ResetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
