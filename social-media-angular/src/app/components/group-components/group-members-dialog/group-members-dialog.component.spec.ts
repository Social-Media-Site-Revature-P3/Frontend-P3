import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupMembersDialogComponent } from './group-members-dialog.component';

describe('GroupMembersDialogComponent', () => {
  let component: GroupMembersDialogComponent;
  let fixture: ComponentFixture<GroupMembersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupMembersDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupMembersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
