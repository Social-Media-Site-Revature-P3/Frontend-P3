import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Event } from 'src/app/interfaces/event';
import { Post } from 'src/app/interfaces/post';
import { User } from 'src/app/interfaces/user';
import { UserEvent } from 'src/app/interfaces/user-event';
import { EventService } from 'src/app/services/event.service';
import { PostService } from 'src/app/services/post.service';
import { UserEventService } from 'src/app/services/user-event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {

  constructor(private activatedRouter: ActivatedRoute, private eventService: EventService, private postService: PostService, private userEventService: UserEventService,
              private userService: UserService, private cookieService: CookieService) { }
  
  eventId: number
  userId: number = +this.cookieService.get('userId')

  event: Event = {
    picture: '',
    date: '',
    time: '',
    info: '',
    name: '',
    inviteOnly: false,
    request: false
  }

  userEvent: UserEvent = {
    user: {
      userId: 0,
      firstName: undefined,
      lastName: undefined,
      nickname: undefined,
      profilePicture: undefined,
      email: undefined
    },
    event: {
      eventId: 0,
      date: undefined,
      group: undefined,
      info: undefined,
      inviteOnly: undefined,
      name: undefined,
      request: undefined,
      time: undefined,
      picture: undefined
    },
    creator: false,
    admin: false
  }

  posts: Post[] = [{
    text: '',
    title: '',
    imageUrl: '',
    user: {
      userId: 0
    }
  }]

  user: User = {
    userId: 0,
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  }

  currentUserEvent: UserEvent = {
    user: {
      userId: 0,
      firstName: undefined,
      lastName: undefined,
      nickname: undefined,
      profilePicture: undefined,
      email: undefined
    },
    event: {
      eventId: 0,
      date: undefined,
      group: undefined,
      info: undefined,
      inviteOnly: undefined,
      name: undefined,
      request: undefined,
      time: undefined,
      picture: undefined
    },
    creator: false,
    admin: false
  }

  createPost: Post = {
    postId: undefined,
    text: '',
    title: '',
    imageUrl: '',
    comment: false,
    createDateTime: '',
    updateDateTime: '',
    user: {
      userId: 0
    },
    event: {
      eventId: 0
    },
    group: {
      groupId: 0
    }

  }

  postInput = new FormGroup({
    title: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required])
  });
  
  ngOnInit(): void {
    this.eventId = this.activatedRouter.snapshot.params['eventId']
    this.userId = +this.cookieService.get('userId')
    
    this.eventService.getByEventId(this.eventId).subscribe((event) => {
      this.event = event;
    })

    this.userService.GetUser(this.userId).subscribe(user => {
      this.user = user;
    })

    this.userEventService.getByUserId(this.userId).subscribe(userEvents => {
      for(let userEvent of userEvents) {
        if(this.userId == userEvent.user.userId) {
          this.currentUserEvent == userEvent;
          console.log(this.currentUserEvent)
        }
        console.log(userEvent)
      }
    })

    this.postService.getByEventId(this.eventId).subscribe((posts: Post[]) => {
      this.posts = posts;
      this.posts.sort((a,b) => {
        return <any>new Date(b.createDateTime!) - <any>new Date(a.createDateTime!)
      })
      
    })

    this.userEventService.getByEventId(this.eventId).subscribe(userEvents => {
      for(let userEvent of userEvents) {
        if(userEvent.creator == true) {
          this.userEvent = userEvent;
        }
      }
    })
  }

  submitPost(){
    this.createPost ={
      title: this.postInput.value.title || "",
      text:  this.postInput.value.text || "",
      imageUrl: this.postInput.value.imageUrl || "",
      user: {
          userId: +this.cookieService.get('userId')
      },
      event: {
        eventId: this.eventId
      }
    }
    this.postService.postPost(this.createPost).subscribe((res: any)=> {this.posts = [res, ...this.posts]})
  }
}
