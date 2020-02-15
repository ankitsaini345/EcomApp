import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { IProduct } from './product';
import { tap, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GetProductService {
  private url = 'assets/products/products.json';
  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url)
      .pipe(
        tap(data => console.log(data))
      );
    ;
  }

  getProduct(id: number): Observable<IProduct | undefined> {
    return this.getProducts()
    .pipe(
      map((products: IProduct[]) => products.find(p => p.productId === id))
    );
  }
}
