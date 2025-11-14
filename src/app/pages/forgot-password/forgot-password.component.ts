import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { ToastrService } from 'ngx-toastr';

interface ForgotForm {
  email: FormControl;
}

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    PrimaryInputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  forgotForm!: FormGroup<ForgotForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) {
    this.forgotForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  submit() {
    this.loginService.forgotPassword(this.forgotForm.value.email)
      .subscribe({
        next: (msg: string) => {
          this.toastService.success(msg);
          this.router.navigate(['/login']);
        },
        error: () => {
          this.toastService.error("Erro ao solicitar recuperação.");
        }
      });
  }

  navigate() {
    this.router.navigate(["/login"]);
  }
}
