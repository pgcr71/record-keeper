import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TooptipComponent } from './tooptip.component';

describe('TooptipComponent', () => {
  let component: TooptipComponent;
  let fixture: ComponentFixture<TooptipComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TooptipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TooptipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
