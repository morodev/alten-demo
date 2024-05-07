import {Routes} from "@angular/router";
import {PostListComponent} from "./post-list.component";
import {PostListResolvers} from "./post-list.resolvers";

export const PostListRoutes: Routes = [
  {
    path: '',
    component: PostListComponent,
    resolve: {
      posts: PostListResolvers
    }
  }
]
