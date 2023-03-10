import { Component, OnInit } from '@angular/core';
import { Product } from '../materia/Product';
import { ProductService } from '../service/product.service';

import { ConfirmationService, PrimeIcons } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-segimiento-estudiante',
  templateUrl: './segimiento-estudiante.component.html',
  styleUrls: ['./segimiento-estudiante.component.scss'],
  styles: [
      `
          :host ::ng-deep .p-dialog .product-image {
              width: 150px;
              margin: 0 auto 2rem auto;
              display: block;
          }
      `
  ],
  providers: [MessageService, ConfirmationService]
})
export class SegimientoEstudianteComponent implements OnInit {
    stateOptions: any[];
  productDialog!: boolean;
  chartOptions: any;

  products!: Product[];

  product!: Product;

  selectedProducts!: Product[];

  submitted!: boolean;

  statuses!: any[];
  value1: string = "off";
  value10!: string ;
  inventoryStatus!: any;
  display!: boolean;
    stackedData!: { labels: string[]; datasets: { type: string; label: string; backgroundColor: string; data: number[]; }[]; };
    stackedOptions!: { tooltips: { mode: string; intersect: boolean; }; responsive: boolean; scales: { xAxes: { stacked: boolean; }[]; yAxes: { stacked: boolean; }[]; }; };
    events!: ({ status: string; date: string; icon: any; color: string; image: string; } | { status: string; date: string; icon: any; color: string; image?: undefined; })[];
    data!: { labels: string[]; datasets: { data: number[]; backgroundColor: string[]; hoverBackgroundColor: string[]; }[]; };

  showDialog() {
    this.productDialog = true;
}
checked: boolean = true;

  constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) 
  {
    this.stateOptions = [{label: 'Off', value: 'off'}, {label: 'On', value: 'on'}];
  }

  ngOnInit() {
    this.data = {
        labels: ['A','B','C'],
        datasets: [
            {
                data: [300, 50, 100],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ]
            }
        ]
    };

    this.events = [
        {status: 'Comptencia 1', date: '15/10/2020 10:30', icon: PrimeIcons.THUMBS_UP, color: '#3b82f6', image: 'game-controller.jpg'},
        {status: 'Competencia 2', date: '15/10/2020 14:00', icon: PrimeIcons.THUMBS_UP, color: '#3b82f6'},
        {status: 'Competencia 3', date: '15/10/2020 16:15', icon: PrimeIcons.THUMBS_UP, color: '#3b82f6'},
        {status: 'Competencia 4', date: '15/10/2020 14:00', icon: PrimeIcons.THUMBS_UP, color: '#3b82f6'},
        {status: 'Competencia 5', date: '15/10/2020 16:15', icon: PrimeIcons.THUMBS_UP, color: '#3b82f6'},
        {status: 'competencia 6', date: '16/10/2020 10:00', icon: PrimeIcons.THUMBS_DOWN_FILL, color: '#607D8B'}
    ];
    
    this.stackedData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            type: 'bar',
            label: 'Dataset 1',
            backgroundColor: '#42A5F5',
            data: [
                50,
                25,
                12,
                48,
                90,
                76,
                42
            ]
        }, {
            type: 'bar',
            label: 'Dataset 2',
            backgroundColor: '#66BB6A',
            data: [
                21,
                84,
                24,
                75,
                37,
                65,
                34
            ]
        }, {
            type: 'bar',
            label: 'Dataset 3',
            backgroundColor: '#FFA726',
            data: [
                41,
                52,
                24,
                74,
                23,
                21,
                32
            ]
        }]
    };

    this.stackedOptions = {
        tooltips: {
            mode: 'index',
            intersect: false
        },
        responsive: true,
        scales: {
            xAxes: [{
                stacked: true,
            }],
            yAxes: [{
                stacked: true
            }]
        }
    };

      this.productService.getProducts().then((data) => (this.products = data));

      this.statuses = [
          { label: 'INSTOCK', value: 'instock' },
          { label: 'LOWSTOCK', value: 'lowstock' },
          { label: 'OUTOFSTOCK', value: 'outofstock' }
      ];
  }

  openNew() {
      this.product = {};
      this.submitted = false;
      this.productDialog = true;
  }

  deleteSelectedProducts() {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the selected products?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.products = this.products.filter((val) => !this.selectedProducts.includes(val));
              // this.selectedProducts = null;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
          }
      });
  }

  editProduct(product: Product) {
      this.product = { ...product };
      this.productDialog = true;
  }

  deleteProduct(product: Product) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete ' + product.name + '?',
          header: 'Confirm',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
              this.products = this.products.filter((val) => val.id !== product.id);
              this.product = {};
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
          }
      });
  }

  hideDialog() {
      this.productDialog = false;
      this.submitted = false;
  }

  saveProduct() {
      this.submitted = true;

      if (this.product.name!.trim()) {
          if (this.product.id) {
              this.products[this.findIndexById(this.product.id)] = this.product;
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
          } else {
              this.product.id = this.createId();
              this.product.image = 'product-placeholder.svg';
              this.products.push(this.product);
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
          }

          this.products = [...this.products];
          this.productDialog = false;
          this.product = {};
      }
  }

  findIndexById(id: string): number {
      let index = -1;
      for (let i = 0; i < this.products.length; i++) {
          if (this.products[i].id === id) {
              index = i;
              break;
          }
      }

      return index;
  }

  createId(): string {
      let id = '';
      var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (var i = 0; i < 5; i++) {
          id += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return id;
  }
  getEventValue($event:any) :string {
    return $event.target.value;
  } 
}
