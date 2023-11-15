import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenciasEstudiantesComponent } from './competencias-estudiantes.component';

describe('CompetenciasEstudiantesComponent', () => {
  let component: CompetenciasEstudiantesComponent;
  let fixture: ComponentFixture<CompetenciasEstudiantesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompetenciasEstudiantesComponent]
    });
    fixture = TestBed.createComponent(CompetenciasEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
