import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionesEstudiantesComponent } from './calificaciones-estudiantes.component';

describe('CalificacionesEstudiantesComponent', () => {
  let component: CalificacionesEstudiantesComponent;
  let fixture: ComponentFixture<CalificacionesEstudiantesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalificacionesEstudiantesComponent]
    });
    fixture = TestBed.createComponent(CalificacionesEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
