import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {QueryQuestions} from './main-content/QueryQuestions'
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class NlpHttpService {

  private questions:QueryQuestions[];
  
  public questionProviderService = 'http://localhost:8095/getAllQueryQuestions';
  public question_arr:QueryQuestions[];

  constructor(private httpclient: HttpClient) { 
  }

  public getAllQuestions(): Observable<QueryQuestions[]> {
   return this.httpclient.get<QueryQuestions[]>(this.questionProviderService);
  }

}