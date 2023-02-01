import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {ButtonModule} from 'primeng/button';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MenubarModule} from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { MenuComponent } from './menu/menu.component';
import { CardsComponent } from './cards/cards.component';
import {CardModule} from 'primeng/card';

import { EstudianteComponent } from './estudiante/estudiante.component';


import { AppRoutingModue } from './app.routing.module';
import { HomeComponent } from './home/home.component';
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';

import {ToastModule} from 'primeng/toast';

import {ProgressBarModule} from 'primeng/progressbar';
import {DropdownModule} from 'primeng/dropdown';
import { CustomerService } from './service/customer.service';
import { MateriaComponent } from './materia/materia.component';
import { CompetenciasComponent } from './competencias/competencias.component';
import {ChipsModule} from 'primeng/chips';
import {ToolbarModule} from 'primeng/toolbar';
import {FileUploadModule} from 'primeng/fileupload';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import {RatingModule} from 'primeng/rating';
import { ProductService } from './service/product.service';
import {InputNumberModule} from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import {RadioButtonModule} from 'primeng/radiobutton';
import { SharedModule } from 'primeng/api';
import { SegimientoEstudianteComponent } from './segimiento-estudiante/segimiento-estudiante.component';
import {AnimateModule} from 'primeng/animate';
import {TimelineModule} from 'primeng/timeline';
import {ChartModule} from 'primeng/chart';
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
    
  ],
  imports: [
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
    ChartModule
    
  ],
  providers: [CustomerService,ProductService, MessageService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
