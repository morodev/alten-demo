import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {WelcomeComponent} from "./welcome/welcome.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PostListModule} from "./posts/post-list.module";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    UserProfileComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        PostListModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
