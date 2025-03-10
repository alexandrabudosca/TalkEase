import { ScoreService } from '../lessons/score.service';
import { AuthService } from './../auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css'
})
export class MenubarComponent {
  data: any;

  constructor(public authService: AuthService, private scoreService: ScoreService) {}

  ngOnInit(): void {
    this.scoreService.getUsername().subscribe({
      next: (data) => {
        this.data = data;
      },
      error: (error) => {
        console.error('Failed to fetch data:', error);
      }
    });
  }

  logout(){
    this.authService.logout();
  }
}
