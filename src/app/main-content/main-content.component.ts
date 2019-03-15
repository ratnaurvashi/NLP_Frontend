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
  private finisher:boolean = true;
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
        this.currentQuestion = this.questions[0].searchString;
        this.showQuestions(0, this.questions);
        console.log("In oonn method");
      });
  }

  showQuestions(index: number, queryQuestionsArray: QueryQuestions[]): void {
    if (queryQuestionsArray == null || queryQuestionsArray.length == 0) {
      this.currentQuestion = "No questions to display";
    } else {
      console.log("else loop of show question");
      this.currentQuestionObject = queryQuestionsArray[index];
      this.currentQuestion = this.currentQuestionObject.searchString;
    }
  }

  getNext(): void {
    if (this.i == this.questions.length - 1) {
      this.questionPublishService.deleteQuestion(this.questions[this.i].uniqueId);
      this.currentQuestion = "Done with all the questions!";
      this.finisher=false;
    }
    else {
      this.i++;
      console.log("index: "+this.i);
      this.showQuestions(this.i, this.questions);
      console.log("delete: "+this.questions[this.i-1].uniqueId);
      this.questionPublishService.deleteQuestion(this.questions[this.i-1].uniqueId);
    }

  }

  sendKnowledgeData(): void {
    this.questionPublishService.publishQuestion("Knowledge",this.input1,this.currentQuestionObject.uniqueId);
  }

  sendComprehensionData(): void {
    this.questionPublishService.publishQuestion("Comprehension",this.input1,this.currentQuestionObject.uniqueId);

  }

  sendApplicationData(): void {
    this.questionPublishService.publishQuestion("Application",this.input1,this.currentQuestionObject.uniqueId);

  }

  sendAnalysisData(): void {
    this.questionPublishService.publishQuestion("Analysis",this.input1,this.currentQuestionObject.uniqueId);

  }

  sendSynthesisData(): void {
    this.questionPublishService.publishQuestion("Synthesis",this.input1,this.currentQuestionObject.uniqueId);

  }

  sendEvaluationData(): void {
    this.questionPublishService.publishQuestion("Evaluation",this.input1,this.currentQuestionObject.uniqueId);

  }
}
