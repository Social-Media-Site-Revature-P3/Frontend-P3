import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarkPageComponent } from './components/bookmark-page/bookmark-page.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { LikesComponent } from './components/likes/likes.component';
import { LoginComponent } from './components/login/login.component';
import { PostFeedPageComponent } from './components/post-feed-page/post-feed-page.component';
import { RegisterComponent } from './components/register/register.component';
import { FollowPageComponent } from './components/follow-page/follow-page.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "post-feed", component: PostFeedPageComponent},
  { path: "bookmark-page", component: BookmarkPageComponent},
  { path: "follow-page", component: FollowPageComponent},
  { path: "profile/:userId", component: UserProfileComponent},
  { path: "edit-profile", component: EditProfileComponent},
  { path: "likes", component: LikesComponent },
  { path: "forgetpassword", component: ChangePasswordComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
