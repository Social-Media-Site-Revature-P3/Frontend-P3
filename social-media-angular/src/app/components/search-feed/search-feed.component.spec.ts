import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFeedComponent } from './search-feed.component';

describe('SearchFeedComponent', () => {
  let component: SearchFeedComponent;
  let fixture: ComponentFixture<SearchFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
