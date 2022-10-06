import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFollowsComponent } from './event-follows.component';

describe('EventFollowsComponent', () => {
  let component: EventFollowsComponent;
  let fixture: ComponentFixture<EventFollowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventFollowsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventFollowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
