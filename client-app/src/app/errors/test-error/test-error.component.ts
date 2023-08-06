import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { noop } from 'rxjs';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.css'],
})
export class TestErrorComponent implements OnInit {
  baseUrl: string = 'https://localhost:5001/api/';
  validationErrors: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  get404Error() {
    this.http
      .get(`${this.baseUrl}buggy/not-found`)
      .subscribe({ next: console.log, error: console.log, complete: noop });
  }

  get400Error() {
    this.http
      .get(`${this.baseUrl}buggy/bad-request`)
      .subscribe({ next: console.log, error: console.log, complete: noop });
  }

  get500Error() {
    this.http
      .get(`${this.baseUrl}buggy/server-error`)
      .subscribe({ next: console.log, error: console.log, complete: noop });
  }

  get401Error() {
    this.http
      .get(`${this.baseUrl}buggy/auth`)
      .subscribe({ next: console.log, error: console.log, complete: noop });
  }

  get400ValidationError() {
    this.http.post(`${this.baseUrl}account/register`, {}).subscribe({
      next: console.log,
      error: (error) => {
        console.log(error);
        this.validationErrors = error;
      },
      complete: noop,
    });
  }
}
