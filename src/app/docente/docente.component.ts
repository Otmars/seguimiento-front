import { Component, OnInit } from '@angular/core';
import { Docente, User } from './docente-inteface';
import { DocenteService } from './docente.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css'],
})
export class DocenteComponent implements OnInit {
  subscription: any;
  selectedDocente!: any;
  docente: User;
  editarbutton: boolean = false;
  display: boolean;
  tituloModal: string;
  docentes: Docente[];
  selectedDocentes: any;
  buttonfiltros: boolean = true;
  loading: boolean = true;
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private docenteService: DocenteService,
    private fb: FormBuilder
  ) {}
  deleteSelectedDocente() {
    this.confirmationService.confirm({
      message:
        '¿Está seguro de que desea eliminar los usuarios selecionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle text-orange-500',
      accept: () => {
        for (let i = 0; i < this.selectedDocentes.length; i++) {
          this.docenteService
            .deleteDocente(this.selectedDocentes[i].iduser.id)
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
  guardarEditarDocente() {
    const id = this.docente.id;

    const data = this.docenteForm.value;
    console.log(id, data);

    this.docenteService.patchDocente(id, data).subscribe((res) => {
      console.log(res);
      this.hideDialog();
    });
  }

  guardarDocente() {
    var nuevoDocente = this.docenteForm.value;
    nuevoDocente.fnacimiento = this.cambiarFormatoFecha(
      this.docenteForm.value.fnacimiento
    );
    delete nuevoDocente.id;
    nuevoDocente.rol = 1;
    this.docenteService.postDocente(nuevoDocente).subscribe((res) => {
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
    this.docente = user;
    this.showDialog();
    this.editarbutton = true;
    this.docenteForm.setValue({
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
      nombres: ['', [Validators.required]],
      apellidoPaterno: ['', [Validators.required]],
      apellidoMaterno: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefono: [, [Validators.required]],
      direccion: [''],
      ci: [, [Validators.required]],
      fnacimiento: [, [Validators.required]],
    });
  }

  docenteForm!: FormGroup;

  crearnuevo() {
    this.editarbutton = false;
    this.showDialog();
  }
  mostrarfiltros() {
    this.buttonfiltros = !this.buttonfiltros;
  }

  ngOnInit(): void {
    this.cargarDocentes();
    this.docenteForm = this.initForm();
    this.subscription = this.docenteService.refresh$.subscribe(() => {
      this.cargarDocentes();
    });
  }

  cargarDocentes() {
    this.docenteService.getDocentes().subscribe((res) => {
      this.docentes = res;
      this.loading = false
    });
  }
  getEventValue($event: any): string {
    return $event.target.value;
  }
  serpararcorreo(text : string){
    
    return text.split('@')
  }
}
