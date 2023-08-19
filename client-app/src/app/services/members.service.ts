import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Member } from '../models/member.model';

@Injectable({
  providedIn: 'root',
})
export class MembersService implements OnInit, OnDestroy {
  baseUrl = environment.apiUrl;
  serviceSubscription = new Subscription();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getMembers() {
    return this.http.get<Member[]>(`${this.baseUrl}users`);
  }

  getMember(username: string) {
    return this.http.get<Member>(`${this.baseUrl}users/${username}`);
  }

  ngOnDestroy(): void {
    this.serviceSubscription.unsubscribe();
  }
}
