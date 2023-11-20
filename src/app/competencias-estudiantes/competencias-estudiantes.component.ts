import { Component, OnInit } from '@angular/core';
import { ComestService } from './comest.service';
import { Table } from 'primeng/table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-competencias-estudiantes',
  templateUrl: './competencias-estudiantes.component.html',
  styleUrls: ['./competencias-estudiantes.component.css'],
})
export class CompetenciasEstudiantesComponent implements OnInit {
  titulo(arg0: any): string | undefined {
    return this.tituloGraficos;
  }
  tituloGraficos: string;
  nombre(arg0: any): string | undefined {
    if (arg0 > []) {
      return (
        arg0.estudiante.iduser.nombres +
        ' ' +
        arg0.estudiante.iduser.apellidoPaterno +
        ' ' +
        arg0.estudiante.iduser.apellidoMaterno
      );
    }
    return 'no hay nombre';
  }
  graficodialog: boolean;
  graficototal() {
    this.tituloGraficos="Grafico General de Competencias"
    let c = 0;
    let d = 0;
    this.competenciasOBtenidas.length;
    this.competenciasOBtenidas.forEach((element1: any) => {
      let x = 0;
      element1.asignatura.asignaturaCompetencia.forEach((element2: any) => {
        x++;
      });
      c = c + x;
    });

    this.cuenta.forEach((element) => {
      d = d + element;
    });
    console.log(d);
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.data = {
      labels: ['Competencias adquiridas: '+d, 'Competencias no Adquiridas:'+c],
      datasets: [
        {
          data: [d, c],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
          ],
        },
      ],
    };
    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          },
        },
      },
    };
    this.graficodialog = true;
  }
  modalGraf(arg0: any, arg1: any , asignatura:any) {
    console.log(asignatura);
    
    this.tituloGraficos= "Grafico de asignatura " + asignatura.nombre
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.data = {
      labels: ['Competencias adquiridas : '+arg0, 'Competencias no Adquiridas: '+(arg1 - arg0)],
      datasets: [
        {
          data: [arg0, arg1 - arg0],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
          ],
        },
      ],
    };
    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          },
        },
      },
    };
    this.graficodialog = true;
  }

  conteo2(_t123: number, total: any) {
    return total - this.cuenta[_t123];
  }
  conteo(_t122: any) {
    return this.cuenta[_t122];
  }
  mostrartabla() {
    this.tabla = true;
  }
  nobnetindas: number;
  nNoObtenidas: number;
  tabla: boolean = false;
  estado(arg0: any) {
    if (arg0) {
      return { message: 'Obtenido', severity: 'success' };
    }
    return { message: 'No Obtenido', severity: 'danger' };
  }

  datoFiltro: any;
  dialogGraficos: boolean;
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      hoverBackgroundColor: string[];
    }[];
  };
  options: {
    plugins: { legend: { labels: { usePointStyle: boolean; color: string } } };
  };
  generarPdf(tabla: Table) {
    var done: any = [];
    if (tabla.filteredValue) {
      tabla.filteredValue.forEach(function (object) {
        done.push([
          object.estudiante.iduser.nombres,
          object.estudiante.iduser.apellidoPaterno,
          object.estudiante.iduser.apellidoMaterno,
          object.estudiante.iduser.ci,
          object.competencia.competencia.descripcion,
          object.competencia.competencia.tipoCompetencia,
          object.competencia.asignatura.nombre,
          object.competencia.asignatura.siglaCodigo,
          object.competencia.asignatura.paralelo,
          object.competencia.asignatura.docente.iduser.nombres +
            ' ' +
            object.competencia.asignatura.docente.iduser.apellidoPaterno +
            ' ' +
            object.competencia.asignatura.docente.iduser.apellidoMaterno +
            ' ',

          new Date(object.createdAt).toLocaleDateString(),
        ]);
      });
    } else {
      tabla.value.forEach(function (object) {
        done.push([
          object.estudiante.iduser.nombres,
          object.estudiante.iduser.apellidoPaterno,
          object.estudiante.iduser.apellidoMaterno,
          object.estudiante.iduser.ci,
          object.competencia.competencia.descripcion,
          object.competencia.competencia.tipoCompetencia,
          object.competencia.asignatura.nombre,
          object.competencia.asignatura.siglaCodigo,
          object.competencia.asignatura.paralelo,
          object.competencia.asignatura.docente.iduser.nombres +
            ' ' +
            object.competencia.asignatura.docente.iduser.apellidoPaterno +
            ' ' +
            object.competencia.asignatura.docente.iduser.apellidoMaterno +
            ' ',

          new Date(object.createdAt).toLocaleDateString(),
        ]);
      });
    }

    const doc = new jsPDF({
      format: 'letter',
    });
    doc.addImage('../../assets/images/encabezado.png', 'PNG', 0, -10, 210, 55);
    doc.setFont('helvetica', 'bold');
    doc.text('REPORTE DOCENTES', 70, 35);
    // doc.autoPrint({ variant: 'non-conform' });

    autoTable(doc, {
      theme: 'grid',
      headStyles: {
        fillColor: [0, 0, 0],
        font: 'helvetica',
        fontSize: 6,
        halign: 'center',
      },
      bodyStyles: {
        font: 'helvetica',
        fontSize: 8,
        cellWidth: 'auto',
        halign: 'center',
      },
      startY: 45,
      tableWidth: 'auto',
      columnStyles: {
        competencia: { cellWidth: 40, fontSize: 6 },
        paralelo: { cellWidth: 6 },
      },
      columns: [
        { header: 'Europe', dataKey: 'europe' },
        { header: 'Europe', dataKey: 'europe' },
        { header: 'Europe', dataKey: 'europe' },
        { header: 'Europe', dataKey: 'europe' },
        { header: 'Competencia', dataKey: 'competencia' },
        { header: 'Europe', dataKey: 'europe' },
        { header: 'Europe', dataKey: 'europe' },
        { header: 'Europe', dataKey: 'europe' },
        { header: 'Paralelo', dataKey: 'paralelo' },
        { header: 'Europe', dataKey: 'europe' },
        { header: 'Europe', dataKey: 'europe' },
      ],
      head: [
        [
          'Nombres',
          'Apellido Paterno',
          'Apellido Materno',
          'C.I.',
          'Competencia',
          'Tipo',
          'Asignatura',
          'sigla',
          'Paralelo',
          'Docente',
          'Fecha',
        ],
      ],
      body: done,
    });
    doc.output('pdfobjectnewwindow');
    // doc.save()
  }
  detalle_estudiante() {
    throw new Error('Method not implemented.');
  }
  representatives: { name: string; image: string }[];
  constructor(private comestService: ComestService) {}
  ngOnInit(): void {
    this.cargarDatos();
  }
  datos: any = {};
  cargarDatos() {
    this.comestService.getCompetencias().subscribe((res) => {
      this.datos = res;
    });
  }
  getEventValue($event: any): string {
    return $event.target.value;
  }
  competenciasOBtenidas: any = [];
  competenciasNoOBtenidas: any = [];
  cuenta: any[] = [];
  datosEstudiante: any = [];
  modalGraficos(datos: any) {
    this.datosEstudiante = datos;
    const id = datos.estudiante.id;
    this.competenciasOBtenidas = [];
    this.competenciasNoOBtenidas = [];
    this.comestService.getCompeteciasNoObtenidas(id).subscribe((res: any) => {
      res.todas.forEach((element1: any) => {
        element1.asignatura.asignaturaCompetencia.forEach((element2: any) => {
          res.obtenidas.forEach((element3: any) => {
            if (
              element2.asignaturaCompetenciaId ==
              element3.competencia.asignaturaCompetenciaId
            ) {
              element2.obtenido = true;
            }
          });
        });
        this.competenciasOBtenidas.push(element1);
      });

      // res.todas.forEach((element1: any) => {
      //   element1.asignatura.asignaturaCompetencia.forEach((element2: any) => {
      //     res.obtenidas.forEach((element3: any) => {
      //       if (
      //         element2.asignaturaCompetenciaId ==
      //         element3.competencia.asignaturaCompetenciaId
      //       ) {

      //         this.competenciasOBtenidas.push(element1);
      //       } else {

      //         this.competenciasNoOBtenidas.push(element1);
      //       }
      //     });
      //   });
      // });
      // res[0].estudiante.competencia.forEach((element: any) => {
      //   console.log(element);

      // });

      this.cuenta = [];
      this.competenciasOBtenidas.forEach((element: any, index: number) => {
        let c = 0;
        element.asignatura.asignaturaCompetencia.forEach((element2: any) => {
          if (!!element2.obtenido) {
            c++;
          }
          this.cuenta[index] = c;
        });
      });
      console.log('->>>>', this.cuenta);
    });

    this.dialogGraficos = true;
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [540, 325, 702],
          backgroundColor: [
            documentStyle.getPropertyValue('--blue-500'),
            documentStyle.getPropertyValue('--yellow-500'),
            documentStyle.getPropertyValue('--green-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--blue-400'),
            documentStyle.getPropertyValue('--yellow-400'),
            documentStyle.getPropertyValue('--green-400'),
          ],
        },
      ],
    };

    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          },
        },
      },
    };
  }
}
