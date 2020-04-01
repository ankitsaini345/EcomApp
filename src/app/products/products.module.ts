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
import { ProductEditInfoComponent } from './product-edit-info/product-edit-info.component';
import { ProductEditTagComponent } from './product-edit-tag/product-edit-tag.component';
import { AuthGuard } from '../shared/auth.guard';

@NgModule({
  declarations: [ProductDetailComponent, ProductListComponent, ProductEditComponent, ProductEditInfoComponent, ProductEditTagComponent],
  imports: [
    CommonModule,
    SharedModule,
    InMemoryWebApiModule.forRoot(ProductData),
    RouterModule.forChild([
      {
        path: 'products',
        children: [
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
        ]
      }

    ])
  ],
  exports: [
  ]
})
export class ProductsModule { }
