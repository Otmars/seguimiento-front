import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReportesService {
  url = environment.url;

  constructor(private http: HttpClient) {}

  getMarteria(id: string): Observable<any> {
    return this.http.get(this.url + 'asignatura/docasi/' + id);
  }

  getCalificaciones(id:number): Observable<any>{
    return this.http.get(this.url + 'calificacion/reporte/' + id);
  }
}
