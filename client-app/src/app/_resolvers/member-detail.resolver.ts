import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Member } from '../models/member.model';
import { MembersService } from '../services/members.service';

export const memberDetailResolver: ResolveFn<Member> = (route, state) => {
  const memberService = inject(MembersService);
  return memberService.getMember(route.paramMap.get('username')!);
};
