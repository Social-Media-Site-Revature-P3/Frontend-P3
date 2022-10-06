import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMembersDialogComponent } from './event-members-dialog.component';

describe('EventMembersDialogComponent', () => {
  let component: EventMembersDialogComponent;
  let fixture: ComponentFixture<EventMembersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventMembersDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventMembersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
