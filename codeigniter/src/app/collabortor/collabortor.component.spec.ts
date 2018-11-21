import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollabortorComponent } from './collabortor.component';

describe('CollabortorComponent', () => {
  let component: CollabortorComponent;
  let fixture: ComponentFixture<CollabortorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollabortorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollabortorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
