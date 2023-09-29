import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  url = environment.url;
  constructor(private http : HttpClient) { }

  getMateriasInscritas(id:string):Observable<any[]>{
    return this.http.get<any[]>(this.url+"horarios/"+id)
  }

  nuevo(body :any){
    return this.http.post(this.url+"horarios",body)
  }

  eliminar ( id :number){
    return this.http.delete(this.url+"horarios/"+id)
  }
}
