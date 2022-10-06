import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './modules/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { PostFeedPageComponent } from './components/post-feed-page/post-feed-page.component';
import { CommentComponent } from './components/comment/comment.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserInitialsPipe } from './pipes/user-initials.pipe';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FollowPageComponent } from './components/follow-page/follow-page.component';
import { BookmarkPageComponent } from './components/bookmark-page/bookmark-page.component';
import { LikesComponent } from './components/likes/likes.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { PopupMsgComponent } from './components/popup-msg/popup-msg.component';
import { CookieService } from 'ngx-cookie-service';
import { ClickOutsideDirective } from './clickOutside.directive'
import { BookmarkComponent } from './components/bookmark/bookmark.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FollowDialogComponent } from './components/follow-dialog/follow-dialog.component';
import { FollowButtonComponent } from './components/follow-button/follow-button.component';
import { PostComponent } from './components/post/post.component';
import { SearchFeedComponent } from './components/search-feed/search-feed.component';
import { EventButtonComponent } from './components/event-components/event-button/event-button.component';
import { EventPageComponent } from './components/event-components/event-page/event-page.component';
import { EventListComponent } from './components/event-components/event-list/event-list.component';
import { GroupButtonComponent } from './components/group-components/group-button/group-button.component';
import { GroupPageComponent } from './components/group-components/group-page/group-page.component';
import { GroupListComponent } from './components/group-components/group-list/group-list.component';
import { EventRequestComponent } from './components/event-components/event-request/event-request.component';
import { NewEventComponent } from './components/event-components/new-event/new-event.component';
import { EventMembersComponent } from './components/event-components/event-members/event-members.component';
import { EventMembersDialogComponent } from './components/event-components/event-members-dialog/event-members-dialog.component';
import { GroupRequestComponent } from './components/group-components/group-request/group-request.component';
import { EventInviteComponent } from './components/event-components/event-invite/event-invite.component';
import { EventFollowsComponent } from './components/event-components/event-follows/event-follows.component';
import { NewGroupComponent } from './components/group-components/new-group/new-group.component';
import { GroupMembersComponent } from './components/group-components/group-members/group-members.component';
import { GroupMembersDialogComponent } from './components/group-components/group-members-dialog/group-members-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PostFeedPageComponent,
    PostComponent,
    CommentComponent,
    UserCardComponent,
    NavbarComponent,
    UserInitialsPipe,
    SearchBarComponent,
    FollowPageComponent,
    BookmarkPageComponent,
    UserProfileComponent,
    LikesComponent,
    ChangePasswordComponent,
    PopupMsgComponent,
    EditProfileComponent,
    LikesComponent,
    BookmarkComponent,
    FollowDialogComponent,
    FollowButtonComponent,
    ClickOutsideDirective,
    SearchFeedComponent,
    EventButtonComponent,
    EventPageComponent,
    EventListComponent,
    GroupButtonComponent,
    GroupPageComponent,
    GroupListComponent,
    EventRequestComponent,
    NewEventComponent,
    EventMembersComponent,
    EventMembersDialogComponent,
    GroupRequestComponent,
    NewGroupComponent,
    GroupMembersComponent,
    GroupMembersDialogComponent,
    EventInviteComponent,
    EventFollowsComponent,
  ],
  entryComponents: [FollowDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
