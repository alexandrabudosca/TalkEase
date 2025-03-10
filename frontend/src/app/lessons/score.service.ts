import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  constructor(private http: HttpClient) { }

  getUsername(){
    return this.http.get("http://localhost:3000/api/profil");
  }

  updateScore(score: number) {
    return this.http.put('http://localhost:3000/api/add', { score });
  }
}
