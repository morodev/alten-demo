import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WelcomeComponent} from "./welcome/welcome.component";

const routes: Routes = [
  {
    path: '', component: WelcomeComponent
  },
  {
    path: 'posts', loadChildren: () => import('src/app/posts/post-list.module').then(m => m.PostListModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
