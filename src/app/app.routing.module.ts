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
const routes: Routes=[
    { path:'', redirectTo: '/login', pathMatch:'full'},
    {path:'home', component:HomeComponent,canActivate:[AuthGuard]},
    {path:'estudiante', component:EstudianteComponent},
    {path:'materia', component:MateriaComponent},
    {path:'competencias', component:CompetenciasComponent},
    {path:'seguimiento', component:SegimientoEstudianteComponent,canActivate:[RoleGuard], data:{expectedRole:'docente'}},
    {path:'login', component:LoginComponent},
    {path:'docentes', component:DocenteComponent}
]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModue{

}