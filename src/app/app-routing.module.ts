import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomeComponent} from "./welcome/welcome.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {UserResolvers, UsersResolvers} from "./posts/post-list.resolvers";

const routes: Routes = [
  {
    path: '', component: WelcomeComponent
  },
  {
    path: 'posts', loadChildren: () => import('src/app/posts/post-list.module').then(m => m.PostListModule)
  },
  {
    path: 'user/:id',
    component: UserProfileComponent,
    resolve: {
      users: UsersResolvers,
      user: UserResolvers
    }
  },
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
