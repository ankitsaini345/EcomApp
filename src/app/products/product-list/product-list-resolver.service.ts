import { Injectable } from '@angular/core';
import { IProduct } from '../product';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { GetProductService } from '../get-product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductListResolverService implements Resolve<IProduct[]> {

  constructor(private productService: GetProductService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IProduct[] | Observable<IProduct[]> {
    return this.productService.getProducts();
  }
}
