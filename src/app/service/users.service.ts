import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../segimiento-estudiante/estudiante';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http : HttpClient) {

   }

  }