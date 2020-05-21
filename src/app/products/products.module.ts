import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailGuard } from './product-detail/product-detail.guard';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductEditGuard } from './product-edit/product-edit.guard';
import { ProductResolverService } from './product-resolver.service';
import { ProductListResolverService } from './product-list/product-list-resolver.service';
import { ProductEditInfoComponent } from './product-edit-info/product-edit-info.component';
import { ProductEditTagComponent } from './product-edit-tag/product-edit-tag.component';
import { ProductCartComponent } from './product-cart/product-cart.component';


@NgModule({
  declarations: [ProductDetailComponent, ProductListComponent,
     ProductEditComponent, ProductEditInfoComponent, ProductEditTagComponent, ProductCartComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
            path: '', component: ProductListComponent,
            resolve: { productList: ProductListResolverService }
          },
          {
            path: ':id', canActivate: [ProductDetailGuard],
            component: ProductDetailComponent,
            resolve: { productData: ProductResolverService }
          },
          {
            path: ':id/edit', canActivate: [ProductEditGuard],
            component: ProductEditComponent,
            resolve: { productData: ProductResolverService },
            children: [
              { path: '', redirectTo: 'info', pathMatch: 'full' },
              { path: 'info', component: ProductEditInfoComponent },
              { path: 'tags', component: ProductEditTagComponent }
            ]
      }
    ])
  ],
  exports: [
  ]
})
export class ProductsModule { }
