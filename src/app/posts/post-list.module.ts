import {NgModule} from "@angular/core";
import {PostListComponent} from "./post-list.component";
import {RouterModule} from "@angular/router";
import {PostListRoutes} from "./post-list.routing";
import {CommonModule} from "@angular/common";
import {PostComponent} from "./post/post.component";
import {PostDetailDrawerComponent} from "./post-detail-drawer";

@NgModule({
  declarations: [
    PostComponent,
    PostListComponent,
    PostDetailDrawerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PostListRoutes)
  ]
})
export class PostListModule {

}
