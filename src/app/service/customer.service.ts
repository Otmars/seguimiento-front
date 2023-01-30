import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { Customer } from '../estudiante/customer'
@Injectable()
export class CustomerService {

  constructor(private http: HttpClient) { }
  getCustomersLarge() {
    return this.http.get<any>('assets/customers-large.json')
        .toPromise()
        .then(res => <Customer[]>res.data)
        .then(data => { return data; });
 }

}
