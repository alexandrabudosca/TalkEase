import { AuthService } from './../auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrl: './chapters.component.css'
})
export class ChaptersComponent {

  constructor(public authService: AuthService) {}

}
