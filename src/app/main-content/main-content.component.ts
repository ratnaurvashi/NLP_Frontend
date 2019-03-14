import { Component, OnInit, ViewChild } from '@angular/core';
import { NlpHttpService } from '../nlp-http.service';
import { QueryQuestions } from './QueryQuestions';
import { SourceListMap } from 'source-list-map';
import { QuestionPublisherService } from '../question-publisher-service';
@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
  providers: [NlpHttpService,QuestionPublisherService]
})
export class MainContentComponent implements OnInit {
  i: number = 0;
  intent: string;
  private input1:string;
  private questions: QueryQuestions[] = [];
  private currentQuestion: string;
  private currentQuestionObject: QueryQuestions;
  constructor(private nlpservice: NlpHttpService,private questionPublishService:QuestionPublisherService) {

  }

  ngOnInit(): void {
    console.log("I am in onInit method");
    this.nlpservice.getAllQuestions().subscribe(
      QueryQuestions => {
        this.questions = QueryQuestions;
        this.showQuestions(0, this.questions);
      });
  }

  showQuestions(index: number, queryQuestionsArray: QueryQuestions[]): void {
    if (queryQuestionsArray == null || queryQuestionsArray.length == 0) {
      this.currentQuestion = "No questions to display";
    } else {
      this.currentQuestionObject = queryQuestionsArray[index];
      this.currentQuestion = this.currentQuestionObject.searchString;
    }
  }

  getNext(): void {
    if (this.i == this.questions.length - 1) {
      alert("Questions over!");
    }
    else {
      this.i++;
      this.showQuestions(this.i, this.questions);
    }

  }

  // getPrevious(): void {
  //   if (this.i == 0) {
  //     alert("No questions before this!");
  //   }
  //   else {
  //     this.i--;
  //     this.showQuestions(this.i, this.questions);
  //   }
  // }

  sendKnowledgeData(): void {
    this.intent = "Knowledge";
    
  }

  sendComprehensionData(): void {
    this.intent = "Comprehension";
    console.log("Intent: " + this.intent);
  }

  sendApplicationData(): void {
    this.intent = "Application";
    console.log("Intent: " + this.intent);
  }

  sendAnalysisData(): void {
    this.intent = "Analysis";
    console.log("Intent: " + this.intent);
  }

  sendSynthesisData(): void {
    this.intent = "Synthesis";
    console.log("Intent: " + this.intent);
  }

  sendEvaluationData(): void {
    this.intent = "Evaluation";
    console.log("Intent: " + this.intent);
  }
}
