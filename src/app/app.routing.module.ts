import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { HomeComponent } from './home/home.component';
import { MateriaComponent } from './materia/materia.component';
import { CompetenciasComponent } from './competencias/competencias.component';
import { SegimientoEstudianteComponent } from './segimiento-estudiante/segimiento-estudiante.component';
import { LoginComponent } from './login/login.component';
import { DocenteComponent } from './docente/docente.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { MateriasDocenteComponent } from './materias-docente/materias-docente.component';
import { DetalleAsignaturaComponent } from './detalle-asignatura/detalle-asignatura.component';
import { HorarioComponent } from './horario/horario.component';
import { AsignaturaCompetenciaComponent } from './asignatura-competencia/asignatura-competencia.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { CompetenciasEstudiantesComponent } from './competencias-estudiantes/competencias-estudiantes.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'estudiante',
    component: EstudianteComponent,
    canActivate: [RoleGuard, AuthGuard],
    data: { expectedRole: 'admin' },
  },
  {
    path: 'asignatura',
    component: MateriaComponent,
    canActivate: [RoleGuard, AuthGuard],
    data: { expectedRole: 'admin' },
  },
  {
    path: 'competencia',
    component: CompetenciasComponent,
    canActivate: [RoleGuard, AuthGuard],
    data: { expectedRole: 'admin' },
  },
  // {path:'seguimiento', component:SegimientoEstudianteComponent,canActivate:[RoleGuard], data:{expectedRole:'docente'}},
  { path: 'login', component: LoginComponent },
  {
    path: 'docente',
    component: DocenteComponent,
    canActivate: [RoleGuard, AuthGuard],
    data: { expectedRole: 'admin' },
  },
  { path: 'menu', component: MenuLateralComponent },
  {
    path: 'asignatura-docentes',
    component: MateriasDocenteComponent,
    canActivate: [RoleGuard, AuthGuard],
    data: { expectedRole: 'docente' },
  },
  {
    path: 'detalle-asignatura',
    component: DetalleAsignaturaComponent,
    canActivate: [RoleGuard, AuthGuard],
    data: { expectedRole: 'docente' },
  },
  { path: 'horario', component: HorarioComponent },
  // {path : 'asignatura-competencia', component:AsignaturaCompetenciaComponent},
  {
    path: 'inscripcion',
    component: InscripcionComponent,
    canActivate: [RoleGuard, AuthGuard],
    data: { expectedRole: 'admin' },
  },
  {
    path: 'comest',
    component: CompetenciasEstudiantesComponent,
    canActivate: [RoleGuard, AuthGuard],
    data: { expectedRole: 'admin' },
  },
  // {path:'admin',component:DashboardComponent,canActivate:[RoleGuard,AuthGuard], data:{expectedRole:'admin'}},
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModue {}
