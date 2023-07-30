import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { noop } from 'rxjs';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  model: { username: ''; password: '' } = { username: '', password: '' };
  @Output() cancelRegister = new EventEmitter<boolean>();

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {}

  register() {
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.cancel();
      },
      error: console.log,
      complete: noop,
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
