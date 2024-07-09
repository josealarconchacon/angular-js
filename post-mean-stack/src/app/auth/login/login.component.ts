import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  isPostLoading: any;
  constructor(private authService: AuthService) {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isPostLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }
}
