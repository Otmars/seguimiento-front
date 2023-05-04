import { Component, OnInit } from '@angular/core';
import { Docente } from './docente-inteface';
import { DocenteService } from './docente.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css'],
})
export class DocenteComponent implements OnInit {
  resetPass() {
    throw new Error('Method not implemented.');
  }
  guardarEditarDocente(arg0: any) {}

  guardarDocente() {
    // console.log(this.docenteForm.value.fnacimiento);

     var nuevoDocente  = this.docenteForm.value;

    nuevoDocente.fnacimiento = this.cambiarFormatoFecha(this.docenteForm.value.fnacimiento)
    console.log(nuevoDocente);
    delete nuevoDocente.id
    nuevoDocente.rol = 1
    this.docenteService.postDocente(nuevoDocente).subscribe(res =>{
      console.log(res);

    })
  }
  cambiarFormatoFecha(fecha:String ){
    const datofecha = fecha.split('/');

    const nuevafecha =
      datofecha[2] + '-' + datofecha[1] + '-' + datofecha[0];
    return nuevafecha
  }

  editarbutton: boolean = false;
  display: boolean;
  tituloModal: string;
  showDialog() {
    this.display = true;
  }
  editar() {
    this.showDialog();
    this.editarbutton = true;
  }
  eliminar() {
    throw new Error('Method not implemented.');
  }
  initForm(): FormGroup {
    return this.fb.group({
      id: [''],
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

  docenteForm!: FormGroup;

  crearnuevo() {
    this.editarbutton = false;
    this.showDialog();
  }
  mostrarfiltros() {
    this.buttonfiltros = !this.buttonfiltros;
  }
  docentes: Docente[];
  selectedDocentes: any;
  buttonfiltros: boolean = true;
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private docenteService: DocenteService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.cargarDocentes();
    this.docenteForm = this.initForm();
  }

  cargarDocentes() {
    this.docenteService.getDocentes().subscribe((res) => {
      this.docentes = res;
      console.log(res);
    });
  }
  getEventValue($event: any): string {
    return $event.target.value;
  }
}
