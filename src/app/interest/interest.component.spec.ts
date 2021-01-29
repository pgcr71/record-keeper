import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InterestComponent } from './interest.component';

describe('InterestComponent', () => {
  let component: InterestComponent;
  let fixture: ComponentFixture<InterestComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [InterestComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
