import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './product-data';

import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailGuard } from './product-detail/product-detail.guard';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductEditGuard } from './product-edit/product-edit.guard';
import { ProductResolverService } from './product-resolver.service';
import { ProductListResolverService } from './product-list/product-list-resolver.service';

@NgModule({
  declarations: [ProductDetailComponent, ProductListComponent, ProductEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    InMemoryWebApiModule.forRoot(ProductData),
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent, resolve: {productList: ProductListResolverService} },
      {
        path: 'products/:id', canActivate: [ProductDetailGuard], component: ProductDetailComponent,
        resolve: { productData: ProductResolverService }
      },
      {
        path: 'products/:id/edit', canDeactivate: [ProductEditGuard], component: ProductEditComponent,
        resolve: { productData: ProductResolverService }
      }
    ])
  ],
  exports: [
  ]
})
export class ProductsModule { }
