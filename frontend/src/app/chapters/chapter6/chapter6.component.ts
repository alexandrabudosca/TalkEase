import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chapter6',
  templateUrl: './chapter6.component.html',
  styleUrl: './chapter6.component.css'
})
export class Chapter6Component {

  constructor(private router: Router) { }

  openDetailPage(currentPage: number): void {
    this.router.navigate(['/lessons', currentPage]);
  }

}
