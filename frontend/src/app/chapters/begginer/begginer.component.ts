import { ScoreService } from '../../lessons/score.service';
import { SpeechService } from '../../lessons/speech.service';
import { LessonsService } from './../../lessons/lessons.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-begginer',
  templateUrl: './begginer.component.html',
  styleUrl: './begginer.component.css'
})
export class BegginerComponent {
  data: any;
  category1: boolean = false;
  category2: boolean = false;
  category3: boolean = false;
  category4: boolean = false;
  category5: boolean = false;
  category6: boolean = false;
  category7: boolean = false;
  category8: boolean = false;
  currentQuestion: number = 0;
  nr: number = 0;
  choose: boolean = false;

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

  constructor(private lessonsService: LessonsService, private speech: SpeechService, private scoreService: ScoreService) {}

  ngOnInit(): void {
    this.lessonsService.getLessonsBegginer().subscribe({
      next: (data) => {
        this.data = data;
      },
      error: (error) => {
        console.error('Failed to fetch data:', error);
      }
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

  print1(){
    this.category1 = !this.category1;
    console.log(this.category1);
  }

  print2(){
    this.category2 = !this.category2;
    console.log(this.category2);
  }

  print3(){
    this.category3 = !this.category3;
    console.log(this.category3);
  }

  print4(){
    this.category4 = !this.category4;
    console.log(this.category4);
  }

  print5(){
    this.category5 = !this.category5;
    console.log(this.category5);
  }

  print6(){
    this.category6 = !this.category6;
    console.log(this.category6);
  }

  print7(){
    this.category7 = !this.category7;
    console.log(this.category7);
  }

  print8(){
    this.category8 = !this.category8;
    console.log(this.category8);
  }

  continua(){
    this.choose = true;

    if(this.category1 === true){
      this.category1 = false
      this.currentQuestion = 0;
    } else
    if(this.category2 === true){
      this.currentQuestion = 8;
      this.category2 = false
    } else
    if(this.category3 === true){
      this.currentQuestion = 16;
      this.category3 = false;
    } else
    if(this.category4 === true){
      this.currentQuestion = 24;
      this.category4 = false;
    } else
    if(this.category5 === true){
      this.currentQuestion = 32;
      this.category5 = false;
    } else
    if(this.category6 === true){
      this.currentQuestion = 40;
      this.category6 = false;
    } else
    if(this.category7 === true){
      this.currentQuestion = 48;
      this.category7 = false;
    } else
    if(this.category8 === true){
      this.currentQuestion = 56;
      this.category8 = false;
    }
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

    if(this.nr === 1 || this.nr === 4) {
      this.isSound = true;
    }
    else {
      this.isSound = false;
    }

    if(this.nr === 3 || this.nr === 6){
      this.speechStopButtonPressed = false;
      this.isSpeech = true;
    }
    else {
      this.isSpeech = false;
    }

    this.currentQuestion ++;
    this.nr ++;
    console.log("nr: " + this.nr);

    console.log("currentQ: " + this.currentQuestion);

    if(this.nr == 8 && this.category2 === true){
      this.currentQuestion = 8;
      this.nr = 0;
      this.category2 = false;
    }

    if(this.nr == 8 && this.category3 === true){
      this.currentQuestion = 16;
      this.nr = 0;
      this.category3 = false;
    }

    if(this.nr == 8 && this.category4 === true){
      this.currentQuestion = 24;
      this.nr = 0;
      this.category4 = false;
    }

    if(this.nr == 8 && this.category5 === true){
      this.currentQuestion = 32;
      this.nr = 0;
      this.category5 = false;
    }

    if(this.nr == 8 && this.category6 === true){
      this.currentQuestion = 40;
      this.nr = 0;
      this.category6 = false;
    }

    if(this.nr == 8 && this.category7 === true){
      this.currentQuestion = 48;
      this.nr = 0;
      this.category7 = false;
    }

    if(this.nr == 8 && this.category8 === true){
      this.currentQuestion = 56;
      this.nr = 0;
      this.category8 = false;
    }

    if(this.nr === 8 && this.category1 === false && this.category2 === false
      && this.category3 === false && this.category4 === false && this.category5 === false
      && this.category6 === false && this.category7 === false && this.category8 === false)
      {
      this.finished = true;
    }
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
