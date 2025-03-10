import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chapter5',
  templateUrl: './chapter5.component.html',
  styleUrl: './chapter5.component.css'
})
export class Chapter5Component {

  constructor(private router: Router) { }

  openDetailPage(currentPage: number): void {
    this.router.navigate(['/lessons', currentPage]);
  }

}
