import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenubarComponent } from './menubar/menubar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ChaptersComponent } from './chapters/chapters.component';
import { Chapter1Component } from './chapters/chapter1/chapter1.component';
import { LessonsComponent } from './lessons/lessons.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { Chapter2Component } from './chapters/chapter2/chapter2.component';
import { Chapter3Component } from './chapters/chapter3/chapter3.component';
import { Chapter4Component } from './chapters/chapter4/chapter4.component';
import { Chapter5Component } from './chapters/chapter5/chapter5.component';
import { Chapter6Component } from './chapters/chapter6/chapter6.component';
import { ProfilComponent } from './profil/profil.component';
import { BegginerComponent } from './chapters/begginer/begginer.component';

@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    ChaptersComponent,
    Chapter1Component,
    LessonsComponent,
    SignupComponent,
    LoginComponent,
    Chapter2Component,
    Chapter3Component,
    Chapter4Component,
    Chapter5Component,
    Chapter6Component,
    ProfilComponent,
    BegginerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true  // This is necessary because HTTP_INTERCEPTORS is a multi-provider token
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
