import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { IProduct } from './product';
import { tap, map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class GetProductService {
  // private url = 'assets/products/products.json';
  // private baseUrl = 'api/products';
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.baseUrl)
      .pipe(
        // tap(data => console.log('getProducts ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getProduct(id: number): Observable<IProduct | undefined> {
    if (id === 0) {
      return of(this.initializeProduct());
    }
    const url = `${this.baseUrl}/${id}`;
    if (!environment.inMem) {
      return this.http.get<IProduct>(url)
        .pipe(
          // tap(data => console.log('getProduct ' + JSON.stringify(data))),
          catchError(this.handleError)
        );
    } else {
      return this.getProducts()
        .pipe(
          map((products: IProduct[]) => products.find(p => p.id === id))  //use in case of json file
        );
    }
  }

  updateProduct(product: IProduct): Observable<IProduct> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put<IProduct>(url, product, { headers })
      .pipe(
        tap(() => console.log('updateProduct: ' + product.id)),
        // Return the product on an update
        map(() => product),
        catchError(this.handleError)
      );
  }

  createProduct(product: IProduct): Observable<IProduct> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    product.id = null;    // for in memory web api
    return this.http.post<IProduct>(this.baseUrl, product, { headers })
      .pipe(
        tap(data => console.log('createProduct: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteProduct(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<IProduct>(url, { headers })
      .pipe(
        tap(data => console.log('deleteProduct: ' + id)),
        catchError(this.handleError)
      );
  }

  initializeProduct(): IProduct {
    return {
      id: 0,
      productName: null,
      productCode: null,
      tags: [''],
      releaseDate: null,
      price: null,
      description: null,
      starRating: null,
      imageUrl: null
    };
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    // console.error(err);
    return throwError(errorMessage);
  }
}
