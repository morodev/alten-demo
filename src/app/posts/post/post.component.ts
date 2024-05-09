import {Component, EventEmitter, Input, Output, ViewEncapsulation} from "@angular/core";

@Component({
  selector: "alten-demo-post",
  templateUrl: "./post.component.html",
  encapsulation: ViewEncapsulation.None
})
export class PostComponent {
  @Input() data!: any;
  @Output() openDetailDrawer: EventEmitter<any> = new EventEmitter<any>()

  onOpenDrawerDetail() {
    this.openDetailDrawer.emit(this.data);
  }
}
