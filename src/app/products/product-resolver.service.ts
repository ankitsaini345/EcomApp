import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IProductResolver } from './product';
import { Observable, of } from 'rxjs';
import { GetProductService } from './get-product.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<IProductResolver> {
  constructor(private productService: GetProductService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProductResolver> {
    const id = route.paramMap.get('id');
    if (isNaN(+id)) {
      const message = `Product id "${id}" is not valid.`;
      console.log(message);
      return of({ product: null, error: message });
    }
    return this.productService.getProduct(+id)
    .pipe(
      map(product => ({ product }),           // sending product part of productResolver Interface. error is optional.
      catchError(error => {
        const message = `Product retrival error ${error}`;
        return of({ product: null, error: message });
      })
    ));
  }

}
