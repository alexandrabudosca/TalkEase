import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chapter2',
  templateUrl: './chapter2.component.html',
  styleUrl: './chapter2.component.css'
})
export class Chapter2Component {

  constructor(private router: Router) { }

  openDetailPage(currentPage: number): void {
    this.router.navigate(['/lessons', currentPage]);
  }
}
