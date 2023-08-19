import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { noop } from 'rxjs';
import { Member } from 'src/app/models/member.model';
import { MembersService } from 'src/app/services/members.service';

@Component({
  standalone: true,
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
  imports: [CommonModule, TabsModule, GalleryModule],
})
export class MemberDetailComponent implements OnInit {
  member: Member | undefined;
  images: GalleryItem[] = [];

  constructor(
    private route: ActivatedRoute,
    private memberService: MembersService
  ) {}

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username');

    if (username) {
      this.memberService.getMember(username).subscribe({
        next: (memeber) => {
          if (memeber) {
            this.member = memeber;

            for (const item of memeber.photos)
              this.images?.push(
                new ImageItem({ src: item.url, thumb: item.url })
              );
          }
        },
        error: console.log,
        complete: noop,
      });
    }

    return;
  }
}
