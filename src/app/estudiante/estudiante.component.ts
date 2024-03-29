import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EstudianteService } from './estudiante.service';
import { Estudiante, User } from './estudiante-inteface';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Table } from 'primeng/table';
@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css'],
})
export class EstudianteComponent implements OnInit {
  subscription: any;
  selectedEstudiante!: any;
  estudiante: User;
  editarbutton: boolean = false;
  display: boolean;
  tituloModal: string;
  estudiantes: Estudiante[];
  selectedEstudiantes: any;
  buttonfiltros: boolean = true;
  loading: boolean = true;
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private estudianteService: EstudianteService,
    private fb: FormBuilder
  ) {}
  deleteSelectedEstudiante() {
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea eliminar los usuarios seleccionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle text-orange-500',
      accept: () => {
        for (let i = 0; i < this.selectedEstudiantes.length; i++) {
          this.estudianteService
            .deleteEstudiante(this.selectedEstudiantes[i].iduser.id)
            .subscribe((res) => {});
        }
        this.messageService.add({
          severity: 'success',
          summary: 'Operacion Realizada',
          detail: 'Usuarios Eliminados',
          life: 3000,
        });
      },
    });
  }

  resetPass() {
    throw new Error('Method not implemented.');
  }
  guardarEditarEstudiante() {
    const id = this.estudiante.id;

    const data = this.estudianteForm.value;
    console.log(id, data);

    this.estudianteService.patchEstudiante(id, data).subscribe((res) => {
      console.log(res);
      this.hideDialog();
    });
  }

  guardarEstudiante() {
    var nuevoEstudiante = this.estudianteForm.value;
    nuevoEstudiante.fnacimiento = this.cambiarFormatoFecha(
      this.estudianteForm.value.fnacimiento
    );
    delete nuevoEstudiante.id;
    nuevoEstudiante.rol = 3;
    this.estudianteService.postEstudiante(nuevoEstudiante).subscribe((res) => {
      const respuesta = res;
      if (Object.values(respuesta)[0] == 'Usuario ya existe') {
        this.hideDialog();
        this.messageService.add({
          severity: 'warn',
          summary: 'Operacion Cancelada',
          detail: 'Usuario ya existe',
          life: 3000,
        });
      } else {
        this.hideDialog();
        this.messageService.add({
          severity: 'success',
          summary: 'Operacion Realizada',
          detail: 'Usuario Creado',
          life: 3000,
        });
      }
    });
  }

  hideDialog() {
    this.display = false;
  }
  cambiarFormatoFecha(fecha: String) {
    const datofecha = fecha.split('/');

    const nuevafecha = datofecha[2] + '-' + datofecha[1] + '-' + datofecha[0];
    return nuevafecha;
  }

  showDialog() {
    this.display = true;
  }
  editar(user: any) {
    console.log(user);
    this.estudiante = user;
    this.showDialog();
    this.editarbutton = true;
    this.estudianteForm.setValue({
      nombres: user.nombres,
      apellidoPaterno: user.apellidoPaterno,
      apellidoMaterno: user.apellidoMaterno,
      email: user.email,
      ci: user.ci,
      telefono: user.telefono,
      direccion: user.direccion,
      fnacimiento: user.fnacimiento,
    });
  }
  eliminar() {
    throw new Error('Method not implemented.');
  }
  initForm(): FormGroup {
    return this.fb.group({
      nombres: ['Juan Pedro', [Validators.required]],
      apellidoPaterno: ['Perez', [Validators.required]],
      apellidoMaterno: ['Mamani', [Validators.required]],
      email: ['Juan@mail.com', [Validators.required, Validators.email]],
      telefono: [12346578, [Validators.required]],
      direccion: ['C/ vereda n°100'],
      ci: [12345678, [Validators.required]],
      fnacimiento: ['12/12/1212', [Validators.required]],
    });
  }

  estudianteForm!: FormGroup;

  crearnuevo() {
    this.editarbutton = false;
    this.showDialog();
  }
  mostrarfiltros() {
    this.buttonfiltros = !this.buttonfiltros;
  }
  row: number = 7;
  ngOnInit(): void {
    console.log(window.screen.availHeight);
    if (window.screen.availHeight > 900) {
      console.log(window.screen.availHeight > 768);

      this.row = 15;
    }
    this.cargarEstudiantes();
    this.estudianteForm = this.initForm();
    this.subscription = this.estudianteService.refresh$.subscribe(() => {
      this.cargarEstudiantes();
    });
  }

  cargarEstudiantes() {
    this.estudianteService.getEstudiantes().subscribe((res) => {
      this.estudiantes = res;
      this.loading = false;
    });
  }
  getEventValue($event: any): string {
    return $event.target.value;
  }
  serpararcorreo(text: string) {
    return text.split('@');
  }
  rows() {
    let row = 7;

    return row;
  }
  generarPdf(tabla: Table) {
    var done: any = [];
    if (tabla.filteredValue) {
      tabla.filteredValue.forEach(function (object) {
        done.push([
          object.id,
          object.iduser.nombres,
          object.iduser.apellidoPaterno,
          object.iduser.apellidoMaterno,
          object.iduser.ci,
          object.iduser.email,
          object.iduser.createdAt
        ]);
      });
    } else {
      tabla.value.forEach(function (object) {
        done.push([
          object.id,
          object.iduser.nombres,
          object.iduser.apellidoPaterno,
          object.iduser.apellidoMaterno,
          object.iduser.ci,
          object.iduser.email,
          object.iduser.createdAt
        ]);
      });
    }

    const doc = new jsPDF({
      format: 'letter',
    });
    doc.addImage('../../assets/images/encabezado.png', 'PNG', 0, -10, 210, 55);
    doc.setFont('helvetica', 'bold');
    doc.text('REPORTE DE TODOS LOS ESTUDIANTES', 70, 35);
    // doc.autoPrint({ variant: 'non-conform' });

    autoTable(doc, {
      theme: 'grid',
      headStyles: { fillColor: [0, 0, 0], font: 'helvetica', fontSize: 8 ,halign:'center'},
      bodyStyles: { font: 'helvetica', fontSize: 8 },
      startY: 45,
      tableWidth: 'auto',
      head: [
        [
          'id',
          'Nombres',
          'Apellido Paterno',
          'Apellido Materno',
          'C.I.',
          'Correo',
          'Telefono',
          'Direccion',
        ],
      ],
      body: done,
    });
    window.open(doc.output('bloburi'),'_blank')
    // doc.save()
  }
}
