import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, noop } from 'rxjs';
import { Member } from 'src/app/models/member.model';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit, OnDestroy {
  members: Member[] = [];
  seviceSubscription = new Subscription();

  constructor(private service: MembersService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.seviceSubscription = this.service.getMembers().subscribe({
      next: (members) => {
        this.members = members;
      },
      error: console.log,
      complete: noop,
    });
  }

  ngOnDestroy(): void {
    this.seviceSubscription.unsubscribe();
  }
}
