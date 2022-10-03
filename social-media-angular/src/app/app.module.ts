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
import { PostComponent } from './components/post/post.component';
import { CommentComponent } from './components/comment/comment.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserInitialsPipe } from './pipes/user-initials.pipe';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EditProfileComponent, UploadProfilePictureDialog } from './components/edit-profile/edit-profile.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FollowPageComponent } from './components/follow-page/follow-page.component';
import { BookmarkPageComponent } from './components/bookmark-page/bookmark-page.component';
import { LikesComponent } from './components/likes/likes.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { PopupMsgComponent } from './components/popup-msg/popup-msg.component';
import { CookieService } from 'ngx-cookie-service';

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
    UploadProfilePictureDialog,
    FollowPageComponent,
    BookmarkPageComponent,
    UserProfileComponent,
    LikesComponent,
    ChangePasswordComponent,
    PopupMsgComponent,
    EditProfileComponent,
  ],
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
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
