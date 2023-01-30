import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegimientoEstudianteComponent } from './segimiento-estudiante.component';

describe('SegimientoEstudianteComponent', () => {
  let component: SegimientoEstudianteComponent;
  let fixture: ComponentFixture<SegimientoEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegimientoEstudianteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SegimientoEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
