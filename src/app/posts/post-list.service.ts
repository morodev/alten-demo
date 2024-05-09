import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Post} from "../../interfaces/post.interface";
import {BehaviorSubject, map, mergeMap, Observable, tap} from "rxjs";
import {environment} from "../../environments/environment";
import {User} from "../../interfaces/user.interface";

/**
 * Servizio per gestire i post e user
 */
@Injectable({
  providedIn: 'root'
})
export class PostListService {

  private _posts: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
  private _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private _user: BehaviorSubject<User | null | undefined> = new BehaviorSubject<User | null | undefined>(null);
  private _allData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  allPosts: Post[] = []
  allUsers: User[] = []
  allDataPostWithUser: any[] = []

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

  set user(user: User | undefined) {
    this._user.next(user);
  }

  get user$(): Observable<User | null | undefined>
  {
    return this._user.asObservable();
  }

  set posts(posts: Post[]) {
    this._posts.next(posts);
  }

  get allData$(): Observable<any[]>
  {
    return this._allData.asObservable();
  }

  set allData(allData: any[]) {
    this._allData.next(allData);
  }

  get users$(): Observable<User[]>
  {
    return this._users.asObservable();
  }

  set users(users: User[]) {
    this._users.next(users);
  }

  getPosts(): Observable<Post[]>
  {
    return this._httpClient.get<Post[]>(environment.server + "/posts").pipe(
      tap((posts: Post[]) => {
        this.posts = posts;
      })
    )
  }

  getUsers(): Observable<User[]>
  {
    return this._httpClient.get<User[]>(environment.server + "/users").pipe(
      tap((users: User[]) => {
        this.users = users;
      })
    )
  }

  getUser(id: number): Observable<User>
  {
    return this._httpClient.get<User>(environment.server + "/users/" + id).pipe(
      tap((user: User) => {
        this.user = user;
      })
    )
  }

  getAllData(): Observable<any[]> {
    return this._httpClient.get<Post[]>(environment.server + "/posts")
      .pipe(
        map(posts => {
          this.allPosts = posts;
          return posts;
        }),
        mergeMap(posts => this._httpClient.get<User[]>(environment.server + "/users").pipe(
          map(users => {
            this.allUsers = users;
            return users;
          }),
        )),
        tap(data => {
          this.allPosts.forEach(post => {
            const user = this.allUsers.find(us => us.id === post.userId);
            this.allDataPostWithUser.push({post, user})
          })
          this._allData.next(this.allDataPostWithUser)
        })
      )
  }

  //getAllPostWithUsers


}
