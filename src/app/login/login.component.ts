import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, Message } from 'primeng/api';
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  messages1!: Message[];
  messages_user!: Message[];
  messages_pass!: Message[];
  loginForm!: FormGroup;
  errorlogin!: any;
  data: any;
visible: boolean;

  constructor(
    private readonly fb: FormBuilder,
    private messageService: MessageService,
    private loginService: LoginService,
    private router: Router
  ) {}
  ngOnInit() {
    this.loginForm = this.initForm();
    this.messages_user = [{ severity: 'error', summary: 'Campo Obligatorio' }];
    this.messages_pass = [{ severity: 'error', summary: 'Campo Obligatorio' }];
  }
  onSubmit() {
    
    console.log(this.loginForm.value);
    const datos = this.loginForm.value;
    const remebercheck = datos.remember;

    delete datos.remember;
    this.loginService.login(datos).subscribe((respuesta: any) => {
      console.log(respuesta);
      if (
        respuesta.response == 'El usuario no existe' ||
        respuesta.response == 'Contraseña incorrecta'
      ) {
        this.clearMessages()
        this.messageService.add({
          severity: 'error',
          summary: respuesta.response,
          detail: 'Verifique los datos ingresados',
        });
      } else {
        if (respuesta.token) {
          // console.log(remebercheck);

          if (remebercheck) {
            localStorage.setItem('token', respuesta.token);
            this.router.navigate(['home']);
          }
          this.router.navigate(['home']);
        }
      }
    });
  }
  initForm(): FormGroup {
    return this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true],
    });
  }
  clearMessages() {
    this.messages_user = [];
    this.messages_pass = [];
  }

}
