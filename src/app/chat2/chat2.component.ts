import { Component, OnInit, NgZone } from '@angular/core';
import Pusher from 'pusher-js';
import { HttpClient } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule,FormControl,FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { AuthenticateService } from '../services/authenticate.service';



@Component({
  selector: 'app-chat2',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule,],
  templateUrl: './chat2.component.html',
  styleUrls: ['./chat2.component.css']
})
export class Chat2Component implements OnInit {
  username: string = `${localStorage.getItem("user_name")}` || "";
  message: string = '';
  chat: string = `${localStorage.getItem("roomNumber")}`;
  messages: { username: string, message: string }[] = [];

  constructor(
    private http: HttpClient,
    private ngZone: NgZone,
    private authService: AuthenticateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkAuthentication();
    this.setupPusher();
  }

  checkAuthentication(): void {
    const token = localStorage.getItem("token");

    this.authService.authenticate(token!).subscribe(
      (response) => {
        console.log('Autenticación exitosa', response);
      },
      (error) => {
        console.error('Error de autenticación', error);
        this.router.navigate(['/registro']);
      }
    );
  }

  setupPusher(): void {
    Pusher.logToConsole = true;

    const pusher = new Pusher('9e5227b9c4e79c8891ed', {
      cluster: 'eu',
    });

    const channel = pusher.subscribe(this.chat);
    channel.bind('message', (data: { username: string, message: string }) => {
      this.handlePusherMessage(data);
    });
  }

  handlePusherMessage(data: { username: string, message: string }): void {
    console.log('Mensaje recibido:', data);
    this.ngZone.run(() => {
      this.messages.push(data);
    });
  }

  submit(): void {
    this.http.post(`https://api-plum-six.vercel.app/api/messages`, {
      username: this.username,
      message: this.message,
      chat: this.chat
    }).subscribe(
      () => this.message = '',
      (error: any) => console.error('Error submitting message:', error)
    );
  }

  getMessageContentClass(username: string): string {
    return username === this.username ? 'message-content-green' : 'message-content-pastel';
  }

  getMessageUsernameClass(username: string): string {
    return username === this.username ? 'message-username-green' : 'message-username-pastel';
  }

 
}