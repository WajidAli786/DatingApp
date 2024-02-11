import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { noop } from 'rxjs';
import { Member } from 'src/app/models/member.model';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent {
  @Input() member: Member | undefined;

  constructor(
    private memberService: MembersService,
    private toastr: ToastrService
  ) {}

  addLike(member: Member) {
    this.memberService.addLike(member.userName).subscribe({
      error: noop,
      next: () => {
        this.toastr.success(`You have liked ${member.knownAs}`);
      },
      complete: noop,
    });
  }
}
