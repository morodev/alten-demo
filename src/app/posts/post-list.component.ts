import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from "@angular/core";
import {Observable, tap} from "rxjs";
import {Post} from "../../interfaces/post.interface";
import {PostListService} from "./post-list.service";
import {PostDetailDrawerComponent} from "./post-detail-drawer";

@Component({
  selector: 'alten-demo-posts-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostListComponent implements OnInit, AfterViewInit {
  allData$!: Observable<Post[]>;
  data: any;
  @ViewChild('detailDrawer') postDetailDrawer!: PostDetailDrawerComponent;
  constructor(private _postListService: PostListService) {
  }
  ngOnInit() {
    this.allData$ = this._postListService.allData$;
  }

  ngAfterViewInit() {
    this.postDetailDrawer.openedChanged.pipe(
      tap(opened => {
        if (!opened) {
          this.data = null;
        }
      })
    ).subscribe()
  }

  onOpenDrawerDetail($event: any, data: any) {
    this._postListService.user = data.user;
    this.data = data;
    this.postDetailDrawer.open();
  }
}
