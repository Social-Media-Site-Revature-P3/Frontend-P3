import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/interfaces/group';
import { Post } from 'src/app/interfaces/post';
import { GroupService } from 'src/app/services/group.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.css']
})
export class GroupPageComponent implements OnInit {

  constructor(private activatedRouter: ActivatedRoute, private groupService: GroupService, private postService: PostService) { }
  groupId: number

  group: Group = {
    picture: '',
    name: '',
    inviteOnly: false,
    request: false,
    about: ''
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
    this.groupId = this.activatedRouter.snapshot.params['groupId']

    this.groupService.getByGroupId(this.groupId).subscribe((group) => {
      this.group = group;
    })

    this.postService.getByGroupId(this.groupId).subscribe((posts: Post[]) => {
      this.posts = posts;
      console.log(this.posts)
    })
  }

}
