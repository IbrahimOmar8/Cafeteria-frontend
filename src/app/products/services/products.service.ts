import { Product } from './../interfaces/product';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, retry } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  httpOption;
  constructor(private http: HttpClient) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': "sfkugkrbf"
      }),
    };
  }
  private handleErr(err: HttpErrorResponse) {
    if (err.status)
      console.log(
        `An Error occured ${err.error} msg: ${err.message} status: ${err.status}`
      );
    alert(
      `An Error occured ${err.error} msg: ${err.message} status: ${err.status}`
    );
    return throwError(() => new Error('Erorr occured please try again'));
  }
  getProducts(): Observable<any> {
    return this.http
      .get<Product[]>(`${environment.BasicURL}/products`)
      .pipe(retry(2), catchError(this.handleErr));
  }

  removeProduct(id: number) {
    return this.http.delete(`${environment.BasicURL}/products/${id}`).pipe(
      catchError((err) => {
        return throwError(err.message || 'Server Error');
      })
    );
  }

  updateProduct(id: number, product: Product) {
    return this.http
      .put(
        `${environment.BasicURL}/${id}`,
        JSON.stringify(product),
        this.httpOption
      )
      .pipe(retry(2), catchError(this.handleErr));
  }

  addProduct(product: Product): Observable<Product> {
    return this.http
      .post<Product>(
        `${environment.BasicURL}/products`,
        JSON.stringify(product),
        this.httpOption
      )
      .pipe(retry(2), catchError(this.handleErr));
  }
  getCategories(): Observable<any> {
    return this.http
      .get<any>(`${environment.BasicURL}/category`)
      .pipe(retry(2), catchError(this.handleErr));
  }
}
