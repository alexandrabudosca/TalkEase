import { Injectable } from '@angular/core';

declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  recognition: any;

  constructor() {
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.lang = 'en-GB';
  }

  start() {
    this.recognition.start();
  }

  stop() {
    this.recognition.stop();
  }

  onResult(callback: (transcript: string) => void) {
    this.recognition.onresult = (event: any) => {
      callback(event.results[0][0].transcript);
    }
  }
}
