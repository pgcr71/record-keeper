import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersLandingComponent } from './customers-landing.component';

describe('CustomersLandingComponent', () => {
  let component: CustomersLandingComponent;
  let fixture: ComponentFixture<CustomersLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomersLandingComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
