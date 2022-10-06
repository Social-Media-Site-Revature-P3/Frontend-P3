import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Group } from 'src/app/interfaces/group';
import { Post } from 'src/app/interfaces/post';
import { User } from 'src/app/interfaces/user';
import { UserGroup } from 'src/app/interfaces/user-group';
import { GroupService } from 'src/app/services/group.service';
import { PostService } from 'src/app/services/post.service';
import { UserGroupService } from 'src/app/services/user-group.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.css']
})
export class GroupPageComponent implements OnInit {

  constructor(private activatedRouter: ActivatedRoute, private groupService: GroupService, private postService: PostService, private userGroupService: UserGroupService,
    private userService: UserService, private cookieService: CookieService) { }

  groupId: number
  userId: number = +this.cookieService.get('userId')

  group: Group = {
    picture: '',
    name: '',
    inviteOnly: false,
    request: false,
    about: ''
  }

  userGroup: UserGroup = {
    user: {
      userId: 0,
      firstName: '',
      lastName: '',
      nickname: '',
      profilePicture: '',
      email: '',
  },
  group: {
    groupId: 0,
    picture: '',
    name: '',
    inviteOnly: false,
    request: false,
    about: ''
  },
  creator: false,
  admin: false,
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

  currentUserGroup: UserGroup = {
    user: {
      userId: 0,
      firstName: '',
      lastName: '',
      nickname: '',
      profilePicture: '',
      email: '',
  },
  group: {
    groupId: 0,
    picture: '',
    name: '',
    inviteOnly: false,
    request: false,
    about: ''
  },
  creator: false,
  admin: false,
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
    this.groupId = this.activatedRouter.snapshot.params['groupId']
    this.userId = +this.cookieService.get('userId')

    this.groupService.getByGroupId(this.groupId).subscribe((group) => {
      this.group = group;
    })

    this.userService.GetUser(this.userId).subscribe(user => {
      this.user = user;
    })

    this.userGroupService.getByUserId(this.userId).subscribe(userGroups => {
      for(let userGroup of userGroups) {
        if(this.userId == userGroup.user.userId) {
          this.currentUserGroup == userGroup;
          console.log(this.currentUserGroup)
        }
        console.log(userGroup)
      }
    })

    this.postService.getByGroupId(this.groupId).subscribe((posts: Post[]) => {
      this.posts = posts;
      this.posts.sort((a,b) => {
        return <any>new Date(b.createDateTime!) - <any>new Date(a.createDateTime!)
      })

    })

    this.userGroupService.getBygroupId(this.groupId).subscribe(userGroups => {
      for(let userGroup of userGroups) {
        if(userGroup.creator == true) {
          this.userGroup = userGroup;
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
      group: {
        groupId: this.groupId
      }
    }
    this.postService.postPost(this.createPost).subscribe((res: any)=> {this.posts = [res, ...this.posts]})
  }

}


