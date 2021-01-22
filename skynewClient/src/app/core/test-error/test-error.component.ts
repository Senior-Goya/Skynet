import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {
  baseURL = environment.apiUrl;
  validationErrors: any;

  constructor(private htpp: HttpClient) { }

  ngOnInit(): void {
    
  }

  get404Error(){
    this.htpp.get(this.baseURL + 'products/42').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
  get500Error(){
    this.htpp.get(this.baseURL + 'buggy/servererror').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
  get400Error(){
    this.htpp.get(this.baseURL + 'buggy/badrequest').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
  get400ValidationError() {
    this.htpp.get(this.baseURL + 'products/fortytwo').subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
      this.validationErrors = error.errors;
    });
  }



}
