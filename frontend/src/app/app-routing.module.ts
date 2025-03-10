import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChaptersComponent } from './chapters/chapters.component';
import { Chapter1Component } from './chapters/chapter1/chapter1.component';
import { LessonsComponent } from './lessons/lessons.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { Chapter2Component } from './chapters/chapter2/chapter2.component';
import { Chapter3Component } from './chapters/chapter3/chapter3.component';
import { Chapter4Component } from './chapters/chapter4/chapter4.component';
import { Chapter5Component } from './chapters/chapter5/chapter5.component';
import { Chapter6Component } from './chapters/chapter6/chapter6.component';
import { ProfilComponent } from './profil/profil.component';
import { BegginerComponent } from './chapters/begginer/begginer.component';

const routes: Routes = [
  { path: '', component: ChaptersComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'chapter1', component: Chapter1Component },
  { path: 'begginer', component: BegginerComponent },
  { path: 'chapter2', component: Chapter2Component },
  { path: 'chapter3', component: Chapter3Component },
  { path: 'chapter4', component: Chapter4Component },
  { path: 'chapter5', component: Chapter5Component },
  { path: 'chapter6', component: Chapter6Component },
  { path: 'lessons/:page', component: LessonsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
