import { LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from 'primeng/button';

import { InputMaskModule } from 'primeng/inputmask';

import { TooltipModule } from 'primeng/tooltip';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { MenuComponent } from './menu/menu.component';
import { CardsComponent } from './cards/cards.component';
import { CardModule } from 'primeng/card';

import { EstudianteComponent } from './estudiante/estudiante.component';

import { AppRoutingModue } from './app.routing.module';
import { HomeComponent } from './home/home.component';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ToastModule } from 'primeng/toast';

import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { CustomerService } from './service/customer.service';
import { MateriaComponent } from './materia/materia.component';
import { CompetenciasComponent } from './competencias/competencias.component';
import { ChipsModule } from 'primeng/chips';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RatingModule } from 'primeng/rating';
import { ProductService } from './service/product.service';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SharedModule } from 'primeng/api';
import { SegimientoEstudianteComponent } from './segimiento-estudiante/segimiento-estudiante.component';
import { AnimateModule } from 'primeng/animate';
import { TimelineModule } from 'primeng/timeline';
import { ChartModule } from 'primeng/chart';
import { SplitButtonModule } from 'primeng/splitbutton';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { LoginComponent } from './login/login.component';
import {DataViewModule} from 'primeng/dataview';
import { CheckboxModule } from 'primeng/checkbox';
import { DocenteComponent } from './docente/docente.component';
import { MessagesModule } from 'primeng/messages';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JWT_OPTIONS } from '@auth0/angular-jwt';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import localeMX from '@angular/common/locales/es-BO'
import { registerLocaleData } from '@angular/common';
import { MateriasDocenteComponent } from './materias-docente/materias-docente.component';
import { DetalleAsignaturaComponent } from './detalle-asignatura/detalle-asignatura.component';
import { HorarioComponent } from './horario/horario.component';
import { PickListModule } from 'primeng/picklist';
import { TagModule } from 'primeng/tag';
import { AsignaturaCompetenciaComponent } from './asignatura-competencia/asignatura-competencia.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
registerLocaleData(localeMX)
import { SpeedDialModule } from 'primeng/speeddial';
import { ReportesComponent } from './reportes/reportes.component';
import { ServiceWorkerModule } from '@angular/service-worker';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MenuComponent,
    CardsComponent,
    EstudianteComponent,
    HomeComponent,
    MateriaComponent,
    CompetenciasComponent,
    SegimientoEstudianteComponent,
    LoginComponent,
    DocenteComponent,
    MenuLateralComponent,
    MateriasDocenteComponent,
    DetalleAsignaturaComponent,
    HorarioComponent,
    AsignaturaCompetenciaComponent,
    InscripcionComponent,
    ReportesComponent,
  ],
  imports: [
    MessagesModule,
    HttpClientModule,
    BrowserModule,
    ButtonModule,
    MenubarModule,
    InputTextModule,
    CardModule,
    FormsModule,
    AppRoutingModue,
    TableModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    ToastModule,
    ProgressBarModule,
    DropdownModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ChipsModule,
    ToolbarModule,
    FileUploadModule,
    ConfirmDialogModule,
    RatingModule,
    InputNumberModule,
    InputTextareaModule,
    RadioButtonModule,
    SharedModule,
    AnimateModule,
    TimelineModule,
    ChartModule,
    SplitButtonModule,
    OverlayPanelModule,
    SelectButtonModule,
    InputSwitchModule,
    CheckboxModule,
    ReactiveFormsModule,
    InputMaskModule,
    TooltipModule,
    DataViewModule,
    FullCalendarModule,
    PickListModule,
    TagModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    {provide:LocationStrategy,useClass:HashLocationStrategy},
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    CustomerService,
    ProductService,
    MessageService,
    ConfirmationService,
    JwtHelperService,
    {provide:LOCALE_ID , useValue: 'es-BO'}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
