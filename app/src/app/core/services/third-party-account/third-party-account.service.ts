import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Response } from 'src/app/models/Response';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ThirdPartyAccountService {
  basePath = 'http://localhost:3091/api/third-party-account';

  httpOptions = {
    headers: new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Authorization: this.authService.getToken(),
    }),
  };
  constructor(private http: HttpClient, private authService: AuthService) {}

  createThirdPartyAccount(data: any): Observable<Response> {
    return this.http
      .post<Response>(`${this.basePath}`, data, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getThirdPartyAccounts(): Observable<Response> {
    return this.http
      .get<Response>(`${this.basePath}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
