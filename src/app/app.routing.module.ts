import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EstudianteComponent } from "./estudiante/estudiante.component";
import { HomeComponent } from "./home/home.component";
import { MateriaComponent } from "./materia/materia.component";
import { CompetenciasComponent } from "./competencias/competencias.component";
import { SegimientoEstudianteComponent } from "./segimiento-estudiante/segimiento-estudiante.component";
import { LoginComponent } from "./login/login.component";
import { DocenteComponent } from "./docente/docente.component";
import { AuthGuard } from "./guards/auth.guard";
import { RoleGuard } from "./guards/role.guard";
import { MenuLateralComponent } from "./menu-lateral/menu-lateral.component";
import { MateriasDocenteComponent } from "./materias-docente/materias-docente.component";
import { DetalleAsignaturaComponent } from "./detalle-asignatura/detalle-asignatura.component";
import { HorarioComponent } from "./horario/horario.component";
import { AsignaturaCompetenciaComponent } from "./asignatura-competencia/asignatura-competencia.component";
import { InscripcionComponent } from "./inscripcion/inscripcion.component";
const routes: Routes=[
    { path:'', redirectTo: '/login', pathMatch:'full'},
    {path:'home', component:HomeComponent,canActivate:[AuthGuard]},
    {path:'estudiante', component:EstudianteComponent},
    {path:'asignatura', component:MateriaComponent},
    {path:'competencia', component:CompetenciasComponent},
    {path:'seguimiento', component:SegimientoEstudianteComponent,canActivate:[RoleGuard], data:{expectedRole:'docente'}},
    {path:'login', component:LoginComponent},
    {path:'docente', component:DocenteComponent},
    {path:'menu',component:MenuLateralComponent},
    {path:'asignatura-docentes',component:MateriasDocenteComponent},
    {path: 'detalle-asignatura', component: DetalleAsignaturaComponent},
    {path: 'horario', component:HorarioComponent},
    {path : 'asignatura-competencia', component:AsignaturaCompetenciaComponent},
    {path : 'inscripcion', component: InscripcionComponent}
]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModue{

}