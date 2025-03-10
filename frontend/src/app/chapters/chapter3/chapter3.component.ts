import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chapter3',
  templateUrl: './chapter3.component.html',
  styleUrl: './chapter3.component.css'
})
export class Chapter3Component {

  constructor(private router: Router) { }

  openDetailPage(currentPage: number): void {
    this.router.navigate(['/lessons', currentPage]);
  }

}
