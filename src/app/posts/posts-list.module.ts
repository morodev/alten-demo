import {NgModule} from "@angular/core";
import {PostsListComponent} from "./posts-list.component";
import {RouterModule} from "@angular/router";
import {PostsListRoutes} from "./posts-list.routing";

@NgModule({
  declarations: [
    PostsListComponent
  ],
  imports: [
    RouterModule.forChild(PostsListRoutes)
  ]
})
export class PostsListModule {

}
