import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentUsersComponent } from './recent-users.component';

describe('RecentUsersComponent', () => {
  let component: RecentUsersComponent;
  let fixture: ComponentFixture<RecentUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecentUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
