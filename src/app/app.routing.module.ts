import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EstudianteComponent } from "./estudiante/estudiante.component";
import { HomeComponent } from "./home/home.component";
import { MateriaComponent } from "./materia/materia.component";
import { CompetenciasComponent } from "./competencias/competencias.component";
import { SegimientoEstudianteComponent } from "./segimiento-estudiante/segimiento-estudiante.component";
import { LoginComponent } from "./login/login.component";
import { DocenteComponent } from "./docente/docente.component";
const routes: Routes=[
    { path:'', redirectTo: '/home', pathMatch:'full'},
    {path:'home', component:HomeComponent},
    {path:'estudiante', component:EstudianteComponent},
    {path:'materia', component:MateriaComponent},
    {path:'competencias', component:CompetenciasComponent},
    {path:'seguimiento', component:SegimientoEstudianteComponent},
    {path:'login', component:LoginComponent},
    {path:'docentes', component:DocenteComponent}
]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModue{

}