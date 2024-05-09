import {Routes} from "@angular/router";
import {PostListComponent} from "./post-list.component";
import {getAllDataResolvers} from "./post-list.resolvers";

export const PostListRoutes: Routes = [
  {
    path: '',
    component: PostListComponent,
    resolve: {
      //posts: PostListResolvers,
      allData: getAllDataResolvers
    }
  }
]
