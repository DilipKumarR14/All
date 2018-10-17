
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FunComponent } from './fun.component';

describe('FunComponent', () => {
  let component: FunComponent;
  let fixture: ComponentFixture<FunComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule],
      declarations: [FunComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
