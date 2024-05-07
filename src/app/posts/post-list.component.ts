import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {Observable} from "rxjs";
import {Post} from "../../interfaces/post.interface";
import {PostListService} from "./post-list.service";

@Component({
  selector: 'alten-demo-posts-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostListComponent implements OnInit{
  posts$!: Observable<Post[]>;

  constructor(private _postListService: PostListService) {
  }
  ngOnInit() {
    this.posts$ = this._postListService.posts$;
  }
}
