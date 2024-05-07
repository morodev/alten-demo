import {NgModule} from "@angular/core";
import {PostListComponent} from "./post-list.component";
import {RouterModule} from "@angular/router";
import {PostListRoutes} from "./post-list.routing";
import {CommonModule} from "@angular/common";
import {PostComponent} from "./post/post.component";

@NgModule({
  declarations: [
    PostComponent,
    PostListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PostListRoutes)
  ]
})
export class PostListModule {

}
