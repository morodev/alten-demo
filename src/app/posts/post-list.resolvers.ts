import {Injectable} from "@angular/core";
import {PostListService} from "./post-list.service";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Post} from "../../interfaces/post.interface";
import {User} from "../../interfaces/user.interface";

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

@Injectable({
  providedIn: 'root'
})
export class getAllDataResolvers
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
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]>
  {
    return this._postListService.getAllData();
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserResolvers
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
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | undefined
  {
    // @ts-ignore
    return this._postListService.getUser(+route.paramMap.get('id'));
  }
}

@Injectable({
  providedIn: 'root'
})
export class UsersResolvers
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
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User[]>
  {
    return this._postListService.getUsers();
  }
}
