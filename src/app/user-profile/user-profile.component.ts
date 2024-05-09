import {Component, OnInit, ViewEncapsulation} from "@angular/core";
import {Observable} from "rxjs";
import {User} from "../../interfaces/user.interface";
import {PostListService} from "../posts/post-list.service";


@Component({
  selector: 'alten-demo-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserProfileComponent implements OnInit {
  user$!: Observable<User | null | undefined>;

  constructor(private _postListService: PostListService) {
  }

  ngOnInit() {
    this.user$ = this._postListService.user$;
  }
}
