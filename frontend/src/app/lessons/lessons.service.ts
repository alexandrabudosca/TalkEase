import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  constructor(private http: HttpClient) { }

  getLessons(page: number) {
    return this.http.get(`http://localhost:3000/api/lessons/${page}`);
  }

  getLessonsBegginer() {
    return this.http.get('http://localhost:3000/api/begginer');
  }
}
