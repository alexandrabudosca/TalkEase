import { ScoreService } from './../lessons/score.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {
  data: any;
  stat: string = "n";

  constructor(private scoreService: ScoreService) {}

  ngOnInit(): void {
    this.scoreService.getUsername().subscribe({
      next: (data) => {
        this.data = data;
        this.status();
      },
      error: (error) => {
        console.error('Failed to fetch data:', error);
      }
    });
  }

  status(){
    if(this.data.score <= 64) {
      this.stat = "begginer";
    }
    else if(this.data.score <= 128){
      this.stat = "elementary";
    }
    else if(this.data.score <= 192){
      this.stat = "intermediate";
    }
    else if(this.data.score <= 256){
      this.stat = "upper-intermediate";
    }
    else if(this.data.score <= 320){
      this.stat = "advanced";
    }
    else {
      this.stat = "proficient";
    }
  }
}
