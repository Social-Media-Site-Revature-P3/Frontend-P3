import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarkPageComponent } from './components/bookmark-page/bookmark-page.component';
import { LoginComponent } from './components/login/login.component';
import { PostFeedPageComponent } from './components/post-feed-page/post-feed-page.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "post-feed", component: PostFeedPageComponent},
  {path: "bookmark-page", component: BookmarkPageComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
