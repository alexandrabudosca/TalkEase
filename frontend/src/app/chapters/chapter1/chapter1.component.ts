import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chapter1',
  templateUrl: './chapter1.component.html',
  styleUrl: './chapter1.component.css'
})
export class Chapter1Component{

  constructor(private router: Router) { }

  openDetailPage(currentPage: number): void {
    this.router.navigate(['/lessons', currentPage]);
  }
}
