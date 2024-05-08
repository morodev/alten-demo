import {Component, EventEmitter, Input, Output, ViewEncapsulation} from "@angular/core";
import {Post} from "../../../interfaces/post.interface";

@Component({
  selector: "alten-demo-post",
  templateUrl: "./post.component.html",
  encapsulation: ViewEncapsulation.None
})
export class PostComponent {
  @Input() post!: Post;
  @Output() openDetailDrawer: EventEmitter<Post> = new EventEmitter<Post>()

  onOpenDrawerDetail() {
    this.openDetailDrawer.emit(this.post);
  }
}
