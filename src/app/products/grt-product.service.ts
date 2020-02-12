import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from './product';
import { tap } from 'rxjs/operators';
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
}
