import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chapter4',
  templateUrl: './chapter4.component.html',
  styleUrl: './chapter4.component.css'
})
export class Chapter4Component {

  constructor(private router: Router) { }

  openDetailPage(currentPage: number): void {
    this.router.navigate(['/lessons', currentPage]);
  }

}
