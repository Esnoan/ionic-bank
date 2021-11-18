import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { BehaviorSubject, from, Observable, throwError } from 'rxjs';
import { retry, catchError, map, switchMap, tap } from 'rxjs/operators';
import { Storage } from '@capacitor/storage';

import { Response } from 'src/app/models/Response';

const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  basePath = 'http://localhost:3091/api/auth';

  httpOptions = {
    headers: new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-type': 'application/json',
    }),
  };

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  token = '';

  constructor(private http: HttpClient) {
    this.loadToken();
  }

  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      console.log('set token: ', token.value);
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  getToken(): string {
    return this.token;
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

  register(user: any): Observable<Response> {
    return this.http
      .post<Response>(
        `${this.basePath}/register`,
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  login(user: any): Observable<any> {
    return this.http
      .post<Response>(
        `${this.basePath}/login`,
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(
        map((res: Response) => res.data.token),
        switchMap((token) =>
          from(Storage.set({ key: TOKEN_KEY, value: token }))
        ),
        tap((_) => {
          this.isAuthenticated.next(true);
        })
      );
  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return Storage.remove({ key: TOKEN_KEY });
  }
}
