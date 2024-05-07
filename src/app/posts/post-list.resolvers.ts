import {Injectable} from "@angular/core";
import {PostListService} from "./post-list.service";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Post} from "../../interfaces/post.interface";

@Injectable({
  providedIn: 'root'
})
export class PostListResolvers
{
  /**
   * Constructor
   */
  constructor(private _postListService: PostListService)
  {
  }

  /**
   * Resolver
   *
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post[]>
  {
    return this._postListService.getPosts();
  }
}
