import { Component, Input, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ReportesService } from './reportes.service';
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css'],
})
export class ReportesComponent implements OnInit {
  materias: any;
  constructor(private reportesService: ReportesService) {}
  @Input() id: string;
  ngOnInit(): void {
    this.reportesService.getMarteria(this.id).subscribe((res) => {
      this.materias = res;
      console.log(this.materias);
    });
  }

  generarPdf(id: number) {
    console.log(id);
    let datos: any;
    this.reportesService.getCalificaciones(id).subscribe((res) => {
      datos = res[0];
      console.log(datos);
      var done: any = [];
      datos.inscripcion.forEach(function (object: any) {
        done.push([
          object.id,
          object.estudiante.iduser.nombres,
          object.estudiante.iduser.apellidoPaterno,
          object.estudiante.iduser.apellidoMaterno,
          object.estudiante.iduser.ci,
        ]);
      });

      const doc = new jsPDF({
        format: 'letter',
      });
      doc.addImage(
        '../../assets/images/encabezado.png',
        'PNG',
        0,
        -10,
        210,
        55
      );
      doc.setFont('helvetica', 'bold');
      doc.text('REPORTE DE CALIFICACION', 70, 35);
      // doc.autoPrint({ variant: 'non-conform' });

      autoTable(doc, {
        theme: 'grid',
        headStyles: {
          fillColor: [0, 0, 0],
          font: 'helvetica',
          fontSize: 8,
          halign: 'center',
          
        },
        bodyStyles: { font: 'helvetica', fontSize: 8, cellWidth: 'wrap' },
        columnStyles: {
          id: { cellWidth: 15 },
          nom: { cellWidth: 28 },
          pat: { cellWidth: 25 },
          mat: { cellWidth: 25 },
          ci: { cellWidth: 18 },
          nota: { },
        },
        columns: [
          { header: 'id', dataKey: 'id' },
          { header: 'Nombres', dataKey: 'nom' },
          { header: 'Apellido Paterno', dataKey: 'pat' },
          { header: 'Apellido Materno', dataKey: 'mat' },
          { header: 'ci', dataKey: 'ci' },
          { header: 'Nota', dataKey: 'nota' },
          { header: 'Nota', dataKey: 'nota' },
          { header: 'Nota', dataKey: 'nota' },
          { header: 'Nota', dataKey: 'nota' },
          { header: 'Nota', dataKey: 'nota' },
          { header: 'Nota', dataKey: 'nota' },
          { header: 'Nota', dataKey: 'nota' },
          { header: 'Nota', dataKey: 'nota' },
          { header: 'Nota', dataKey: 'nota' },
          { header: 'Nota', dataKey: 'nota' },
          { header: 'Nota', dataKey: 'nota' },
          { header: 'Nota', dataKey: 'nota' },
          { header: 'Nota', dataKey: 'nota' },
          { header: 'Nota', dataKey: 'nota' },
          { header: 'Nota', dataKey: 'nota' },
          { header: 'Nota', dataKey: 'nota' },
          { header: 'Nota', dataKey: 'nota' },
          { header: 'Nota', dataKey: 'nota' },
          { header: 'Nota', dataKey: 'nota' },
          { header: 'Nota', dataKey: 'nota' },
        ],
        startY: 45,
        tableWidth: 'auto',
        head: [
          [
            'id',
            'Nombres',
            'Apellido Paterno',
            'Apellido Materno',
            'C.I.',
          ],
        ],
        body: done,
      });
      window.open(doc.output('bloburi'),'_blank')
    });
  }
}
