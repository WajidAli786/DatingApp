import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { noop, take } from 'rxjs';
import { Member } from 'src/app/models/member.model';
import { User } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  user: User | undefined;
  member: Member | undefined;

  @ViewChild('editForm') editForm: NgForm | undefined;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private toastr: ToastrService,
    private memberService: MembersService,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        this.user = user;
      },
      error: console.log,
      complete: noop,
    });
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    if (this.user) {
      this.memberService.getMember(this.user.username).subscribe({
        next: (member) => {
          this.member = member;
        },
        error: console.log,
        complete: noop,
      });
    }

    return;
  }

  updateMember() {
    this.memberService.updateMember(this.editForm?.value).subscribe({
      next: () => {
        this.toastr.success('Profile updated successfully!', 'Success!');
        this.editForm?.reset(this.member);
      },
      error: console.log,
      complete: noop,
    });
  }
}
