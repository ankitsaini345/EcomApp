import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/productlist.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ProductDetailComponent, ProductListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent }
    ])
  ],
  exports: [
    ProductDetailComponent,
    ProductListComponent
  ]
})
export class ProductsModule { }
