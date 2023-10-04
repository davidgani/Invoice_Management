import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private baseUrl = 'https://localhost:7154'; 

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  getData<T>(endpoint: string): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.get<T>(url).pipe(
      catchError(this.handleError)
    );
  }

  postData<T>(endpoint: string, data: any): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    return this.http.post<T>(url, data).pipe(
      catchError((res) => this.handleError(res))
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    const errorMessage = error.error ?? 'Something went wrong. Please try again later.';
    this.snackBar.open(errorMessage, 'Close', {
      duration: 5000,
    });
    return throwError(errorMessage);
  }
}
