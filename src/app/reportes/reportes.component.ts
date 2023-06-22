import { Component } from '@angular/core';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {

  generarPdf(){
    const doc = new jsPDF({
      format:'letter',

    });
    doc.addImage("../../assets/images/encabezado.png", "PNG", 0, -10, 210, 55);
    doc.setFont("helvetica", "bold");
    doc.text("REPORTE DE MATERIA INSCRITAS", 70, 35,);
    doc.autoPrint({variant: 'non-conform'});
doc.output("pdfobjectnewwindow")
  }
}
