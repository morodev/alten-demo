import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Post} from "../../interfaces/post.interface";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {environment} from "../../environments/environment";

/**
 * Servizio per gestire i post
 */
@Injectable({
  providedIn: 'root'
})
export class PostListService {

  private _posts: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);

  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient)
  {
  }

  get posts$(): Observable<Post[]>
  {
    return this._posts.asObservable();
  }

  set posts(posts: Post[]) {
    this._posts.next(posts);
  }

  getPosts(): Observable<Post[]>
  {
    return this._httpClient.get<Post[]>(environment.server + "/posts").pipe(
      tap((posts: Post[]) => {
        this.posts = posts;
      })
    )
  }


}
