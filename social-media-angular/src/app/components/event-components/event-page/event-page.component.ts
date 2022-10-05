import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/interfaces/event';
import { Post } from 'src/app/interfaces/post';
import { EventService } from 'src/app/services/event.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {

  constructor(private activatedRouter: ActivatedRoute, private eventService: EventService, private postService: PostService) { }
  eventId: number

  event: Event = {
    picture: '',
    date: '',
    time: '',
    info: '',
    name: '',
    inviteOnly: false,
    request: false
  }

  posts: Post[] = [{
    text: '',
    title: '',
    imageUrl: '',
    user: {
      userId: 0
    }
  }]
  
  ngOnInit(): void {
    this.eventId = this.activatedRouter.snapshot.params['eventId']
    
    this.eventService.getByEventId(this.eventId).subscribe((event) => {
      this.event = event;
    })

    this.postService.getByEventId(this.eventId).subscribe((posts: Post[]) => {
      this.posts = posts;
      console.log(this.posts)
    })
  }
}
