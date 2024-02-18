import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../../services/services.service';
import { user } from '../../interfaces/user_interface';
import { AuthenticationService } from '../../services/authentication.service';
@Component({
  selector: 'app-login-user-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-user-page.component.html',
  styleUrls: ['./login-user-page.component.css'],
})
export class LoginUserPageComponent implements OnInit {
  ngOnInit(): void {
  }

  showLoginForm: boolean = true;
  showRegisterForm: boolean = false;

  constructor(
    private router: Router,
    private servicesService: ServicesService,
  ) {}

  

  registerForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    userName: new FormControl(''),
    name: new FormControl(''),
    surname: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  loginForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    if (this.showLoginForm && this.loginForm.valid) {
      const loginFormData = this.loginForm.value;

      this.servicesService.loginUser(loginFormData).subscribe((response) => {
        console.log('Login successful', response);
        console.log('Login successful', response.data.token);
        localStorage.setItem('token',response.data.token );
        localStorage.setItem('id_user',response.data.user._id );
        localStorage.setItem('user_name',response.data.user.name );


        console.log(this.loginForm.value);
        this.router.navigate(['/ubicacion']);
      });
  
    } else if (!this.showLoginForm && this.registerForm.valid) {
      const password = this.registerForm.get('password')?.value;
      const confirmPassword = this.registerForm.get('confirmPassword')?.value;
      if (password === confirmPassword) {
        const registerFormData = this.registerForm.value;
        this.servicesService.registerUser(registerFormData).subscribe(
          (response) => {
            console.log('Register successful', response);
            console.log(this.registerForm.value);
            this.router.navigate(['/ubicacion']);
          },
          (error) => {
            console.error('Error during login: ', error);
          }
        );

      } else {
        alert('Las contraseñas no son iguales');
      }
    }
  }

  toggleForm() {
    this.showLoginForm = !this.showLoginForm;
  }
}
