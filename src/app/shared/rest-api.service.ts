import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { Employee } from './employee';
import { Company } from './company';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  apiURL = 'http://localhost:5279';
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getEmployees(): Observable<Employee> {
    return this.http
      .get<Employee>(this.apiURL + '/api/Employee')
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch employee
  getEmployee(id: any): Observable<Employee> {
    return this.http
      .get<Employee>(this.apiURL + '/api/Employee/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  addEmployee(employee: any): Observable<Employee> {
    return this.http
      .post<Employee>(
        this.apiURL + '/api/Employee/',
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  editEmployee(id: any, employee: any): Observable<Employee> {
    return this.http
      .put<Employee>(
        this.apiURL + '/api/Employee/' + id,
        JSON.stringify(employee),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteEmployee(id: any): any {
    return this.http
      .delete(this.apiURL + '/api/Employee/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getCompanies(): Observable<Company> {
    return this.http
      .get<Company>(this.apiURL + '/api/Company')
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch employee
  getCompany(id: any): Observable<Company> {
    return this.http
      .get<Company>(this.apiURL + '/api/Company/' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  addCompany(company: any): Observable<Company> {
    return this.http
      .post<Company>(
        this.apiURL + '/api/Company/',
        JSON.stringify(company),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  editComany(id: any, company: any): Observable<Company> {
    return this.http
      .put<Company>(
        this.apiURL + '/api/Company/' + id,
        JSON.stringify(company),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteCompany(id: any): any {
    return this.http
      .delete(this.apiURL + '/api/Company/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
