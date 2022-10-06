import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupFollowsComponent } from './group-follows.component';

describe('GroupFollowsComponent', () => {
  let component: GroupFollowsComponent;
  let fixture: ComponentFixture<GroupFollowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupFollowsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupFollowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
