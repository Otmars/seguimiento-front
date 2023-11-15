import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'lib';
  constructor(private config: PrimeNGConfig) {}

    ngOnInit() {
        this.config.setTranslation({
            matchAny:'Uno',
            matchAll:'Todos',
            clear:'Limpiar',
            apply:'Aplicar',
            addRule:'Añadir'
            //translations
        });
    }
}
