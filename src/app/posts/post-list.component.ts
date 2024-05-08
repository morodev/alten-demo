import {Component, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {Observable} from "rxjs";
import {Post} from "../../interfaces/post.interface";
import {PostListService} from "./post-list.service";
import {PostDetailDrawerComponent} from "./post-detail-drawer";

@Component({
  selector: 'alten-demo-posts-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostListComponent implements OnInit {
  posts$!: Observable<Post[]>;
  @ViewChild('detailDrawer') postDetailDrawer!: PostDetailDrawerComponent;
  constructor(private _postListService: PostListService) {
  }
  ngOnInit() {
    this.posts$ = this._postListService.posts$;
  }

  onOpenDrawerDetail($event: Post) {
    this.postDetailDrawer.open();
  }
}
