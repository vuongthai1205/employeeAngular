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
        .get<Employee>(`${this.apiURL}/api/Employee`)
        .pipe(retry(1), catchError(this.handleError))
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

  addCompanyToEmployee(id: any, idC: any): Observable<any> {
    return this.http.post(
      this.apiURL + '/api/Employee/' + id + '/add-company/' + idC,
      this.httpOptions
    );
  }

  addEmployeesToCompany(id: any, employees: any): Observable<any> {
    return this.http.post(
      this.apiURL + '/api/Company/' + id + '/add-employees/',
      employees,
      this.httpOptions
    );
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

  editCompany(id: any, company: any): Observable<Company> {
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

  getAutoPlace(place: string): any {
    return this.http
      .get(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${place}&filter=countrycode:vn&apiKey=5ee96c9504d34514bd9fe5625d86fa7f`,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  getCountEmployee = () => {
    return this.http.get(`${this.apiURL}/api/Employee/count`, this.httpOptions).pipe(retry(1), catchError(this.handleError));
  };

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
