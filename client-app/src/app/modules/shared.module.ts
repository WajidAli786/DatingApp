import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),
    NgxSpinnerModule.forRoot({
      type: 'line-scale-party',
    }),
  ],
  exports: [ToastrModule, BsDropdownModule, TabsModule, NgxSpinnerModule],
})
export class SharedModule {}
