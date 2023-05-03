import { Component, OnInit, Input } from '@angular/core';

import { Product } from './Product';
import { ProductService } from '../service/product.service';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { MateriaService } from './materia.service';
import { Asingatura } from './inteface-materia';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class MateriaComponent implements OnInit {
  public asignatura: any = [];
  datos!: Asingatura[];
  dato!: Asingatura;
  productDialog!: boolean;

  products!: Product[];

  product!: Product;

  selectedProducts!: any;

  submitted!: boolean;

  statuses!: any[];
  prerequisitos: any;
  asignaturaForm!: FormGroup;
  selectedPrerequisitos: any;
  inventoryStatus!: any;
  cols: { field: string; header: string }[];
  selectedDocente:any
  listadocentes:any
  tituloModal ="Asignatura"
  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private materiaService: MateriaService,
    private fb:FormBuilder
  ) {}

  ngOnInit(): void {
    this.asignaturaForm = this.initForm();

    this.cargarDatos();
    this.cargarDocente()
    this.productService.getProducts().then((data) => (this.products = data));
  }
  initForm(): FormGroup {
    return this.fb.group({
      nombre:      ['',[Validators.required,Validators.minLength(7)]],
      siglaCodigo: [,[Validators.required,,Validators.minLength(7)]],
      cargaHoraria:[,[Validators.required]],
      nMeses:      [,[Validators.required]],
      paralelo:    ['',[Validators.required]],
      docente:    ['',[Validators.required]],
    });
  }
  cargarDatos() {
    this.materiaService.getMarteria().subscribe((respuesta: Asingatura[]) => {
      this.datos = respuesta;
      console.log(this.datos);
    });
  }
  nuevoAsignatura() {
    this.asignaturaForm = this.initForm();
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }
  cargarDocente(){
    this.materiaService.getDocenteNombre().subscribe(res =>{
      this.listadocentes = res
      console.log(this.listadocentes);
      
    })
  }
  deleteSelectedAsignatura() {
    
    // console.log(this.selectedProducts[0].id);
    // for (let i = 0; i < this.selectedProducts.length; i++) {
    //   materiaBorrar.push(this.selectedProducts[i].id);
    //   console.log(materiaBorrar);
    // }
    this.confirmationService.confirm({
      message:
        '¿Está seguro de que desea eliminar las asignatura selecionadas seleccionados?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle text-orange-500',
      accept: () => {
        const materiaBorrar: [] =[]
        
        for (let i = 0; i < this.selectedProducts.length; i++) {
          this.materiaService.deleteMateria(this.selectedProducts[i].id).subscribe(res=>{
            console.log(res);
          })
          
        }
        // this.selectedProducts = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Operacion Realizada',
          detail: 'Eliminado con exito',
          life: 3000,
        });
      },
    });
  }
  hideDialog() {
    this.productDialog = false;
    
  }
  guardarAsignatura() {
    const newAsignatura = this.asignaturaForm.value
    this.materiaService.postMateria(newAsignatura).subscribe(res =>{
      console.log(res);
      
    })
    console.log(this.asignaturaForm.value);
    
  }
  
  // openNew() {
  //   this.product = {};
  //   this.submitted = false;
  //   this.productDialog = true;
  // }

  // deleteSelectedProducts() {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure you want to delete the selected products?',
  //     header: 'Confirm',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.products = this.products.filter(
  //         (val) => !this.selectedProducts.includes(val)
  //       );
  //       // this.selectedProducts = null;
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Successful',
  //         detail: 'Products Deleted',
  //         life: 3000,
  //       });
  //     },
  //   });
  // }

  // editProduct(product: Product) {
  //   this.product = { ...product };
  //   this.productDialog = true;
  // }

  // deleteProduct(product: Product) {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure you want to delete ' + product.name + '?',
  //     header: 'Confirm',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.products = this.products.filter((val) => val.id !== product.id);
  //       this.product = {};
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Successful',
  //         detail: 'Product Deleted',
  //         life: 3000,
  //       });
  //     },
  //   });
  // }

  // saveProduct() {
  //   this.submitted = true;

  //   if (this.product.name!.trim()) {
  //     if (this.product.id) {
  //       this.products[this.findIndexById(this.product.id)] = this.product;
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Successful',
  //         detail: 'Product Updated',
  //         life: 3000,
  //       });
  //     } else {
  //       this.product.id = this.createId();
  //       this.product.image = 'product-placeholder.svg';
  //       this.products.push(this.product);
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Successful',
  //         detail: 'Product Created',
  //         life: 3000,
  //       });
  //     }

  //     this.products = [...this.products];
  //     this.productDialog = false;
  //     this.product = {};
  //   }
  // }

  // findIndexById(id: string): number {
  //   let index = -1;
  //   for (let i = 0; i < this.products.length; i++) {
  //     if (this.products[i].id === id) {
  //       index = i;
  //       break;
  //     }
  //   }

  //   return index;
  // }

  // createId(): string {
  //   let id = '';
  //   var chars =
  //     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   for (var i = 0; i < 5; i++) {
  //     id += chars.charAt(Math.floor(Math.random() * chars.length));
  //   }
  //   return id;
  // }
  // getEventValue($event: any): string {
  //   return $event.target.value;
  // }
}
