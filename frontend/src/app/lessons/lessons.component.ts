import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { LessonsService } from './lessons.service';
import { SpeechService } from './speech.service';
import { ActivatedRoute } from '@angular/router';
import { ScoreService } from './score.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrl: './lessons.component.css'
})
export class LessonsComponent implements OnInit{
  data: any = [];
  currentQuestion: number = 0;
  buttonAPressed: boolean = false;
  buttonBPressed: boolean = false;
  buttonCPressed: boolean = false;
  index: number = 0;
  score: number = 0;
  correctAnswer: boolean = false;
  wrongAnswer: boolean = false;
  check: boolean = true;
  finished: boolean = false;

  sound = new Audio();
  isSound: boolean = false;

  transcript: string = "";
  isSpeech: boolean = false;
  speechStartButtonPressed: boolean = false;
  speechStopButtonPressed: boolean = false;

  user: any;

  constructor(private lessonService: LessonsService, private speech: SpeechService, private route: ActivatedRoute, private scoreService: ScoreService, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const page = +params['page'];
      this.fetchData(page);
    });

    this.speech.onResult((transcript: string) => {
      this.transcript = transcript;
    });

    this.scoreService.getUsername().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (error) => {
        console.error('Failed to fetch data:', error);
      }
    });
  }

  fetchData(page: number): void {
    this.lessonService.getLessons(page).subscribe({
      next: (data) => {
        this.data = data;
      },
      error: (error) => {
        console.error('Failed to fetch data:', error);
      }
    });
  }

  startRecognition() {
    this.speechStartButtonPressed = true;
    this.speech.start();
  }

  stopRecognition(sound: string) {
    this.speechStartButtonPressed = false;
    this.speechStopButtonPressed = true;
    this.speech.stop();
    setTimeout(() => { // Delay displaying the message
      console.log('Stopped listening. You said (after delay): ' + this.transcript);
      if(this.transcript === sound) {
        this.correctAnswer = true;
        this.check = false;
        this.score ++;
      }
      else {
        this.wrongAnswer = true;
        this.check = false;
      }
    }, 700);
  }

  checkPressedA(){
    this.index = 0;
    this.buttonAPressed = !this.buttonAPressed;
    this.buttonBPressed = false;
    this.buttonCPressed = false
  }

  checkPressedB(){
    this.index = 1;
    this.buttonAPressed = false;
    this.buttonBPressed = !this.buttonBPressed;
    this.buttonCPressed = false;
  }

  checkPressedC(){
    this.index = 2;
    this.buttonAPressed = false;
    this.buttonBPressed = false;
    this.buttonCPressed = !this.buttonCPressed;
  }

  checkAnswer(option: number){
    if((this.buttonAPressed || this.buttonBPressed || this.buttonCPressed) && (option === this.index)){
      this.correctAnswer = true;
      this.check = false;
      this.score ++;
    }
    else if((this.buttonAPressed || this.buttonBPressed || this.buttonCPressed) && (option != this.index)){
      this.wrongAnswer = true;
      this.check = false;
    }
  }

  listen(text: string){
    this.sound.src = `../../assets/${text}`;
    this.sound.play();
  }

  nextQuestion() {
    this.buttonAPressed = this.buttonBPressed = this.buttonCPressed = false;
    this.correctAnswer = false;
    this.wrongAnswer = false;
    this.check = true;

    if(this.currentQuestion === 1 || this.currentQuestion === 4) {
      this.isSound = true;
    }
    else {
      this.isSound = false;
    }

    if(this.currentQuestion === 3 || this.currentQuestion === 6){
      this.speechStopButtonPressed = false;
      this.isSpeech = true;
    }
    else {
      this.isSpeech = false;
    }

    if(this.currentQuestion === 7){
      this.finished = true;
    }

    this.currentQuestion ++;
  }

  finishQuiz() {
    this.score += this.user.score;
    this.scoreService.updateScore(this.score).subscribe(response => {
      console.log('Score updated successfully', response);
      window.location.reload();
    }, error => {
      console.error('Error updating score', error);
    });

    window.history.back();
  }
}
