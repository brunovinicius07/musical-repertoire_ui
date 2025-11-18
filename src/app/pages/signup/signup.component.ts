import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { ToastrService } from 'ngx-toastr';

interface SignupForm {
  nameUser: FormControl,
  email: FormControl,
  password: FormControl,
  confirmNewPassword: FormControl
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm!: FormGroup<SignupForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ){
    this.signupForm = new FormGroup({
      nameUser: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmNewPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
  if (this.signupForm.value.password !== this.signupForm.value.confirmNewPassword) {
    this.toastService.error("As senhas não coincidem!");
    return;
  }

  this.loginService.signup(
    this.signupForm.value.nameUser!,
    this.signupForm.value.email!,
    this.signupForm.value.password!,
    this.signupForm.value.confirmNewPassword!
  ).subscribe({
    next: () => {
      this.router.navigate(["/dashboard"]);
    },
    error: () => this.toastService.error("Não foi possível criar a conta!")
  });

}

  navigate(){
    this.router.navigate(["/login"])
  }
}
