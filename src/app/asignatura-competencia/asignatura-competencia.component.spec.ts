import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaturaCompetenciaComponent } from './asignatura-competencia.component';

describe('AsignaturaCompetenciaComponent', () => {
  let component: AsignaturaCompetenciaComponent;
  let fixture: ComponentFixture<AsignaturaCompetenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignaturaCompetenciaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignaturaCompetenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
