import {Component, Input, ViewEncapsulation} from "@angular/core";
import {Post} from "../../../interfaces/post.interface";

@Component({
  selector: "alten-demo-post",
  templateUrl: "./post.component.html",
  encapsulation: ViewEncapsulation.None
})
export class PostComponent {
  @Input() post!: Post;
}
