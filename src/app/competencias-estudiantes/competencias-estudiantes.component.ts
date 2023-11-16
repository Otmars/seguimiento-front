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
    console.log(tabla.value);

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
    this.representatives = [
      { name: 'Amy Elsner', image: 'amyelsner.png' },
      { name: 'Anna Fali', image: 'annafali.png' },
      { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
      { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
      { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
      { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
      { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
      { name: 'Onyama Limba', image: 'onyamalimba.png' },
      { name: 'Stephen Shaw', image: 'stephenshaw.png' },
      { name: 'Xuxue Feng', image: 'xuxuefeng.png' },
    ];
  }
  datos: any = {};
  cargarDatos() {
    this.comestService.getCompetencias().subscribe((res) => {
      console.log(res);
      this.datos = res;
      console.log(this.datos.estudiantes[0]);
    });
  }
  getEventValue($event: any): string {
    return $event.target.value;
  }
  competenciasOBtenidas:[]
  modalGraficos(id: any) {
    
    this.comestService.getCompeteciasNoObtenidas(id).subscribe((res:any) => {
      // console.log(res);

      res.forEach((element: any) => {
        console.log(element);
        
      });

      // res[0].estudiante.competencia.forEach((element: any) => {
      //   console.log(element);
        
      // });
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
