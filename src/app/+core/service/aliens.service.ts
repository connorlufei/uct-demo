import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Alien } from '../models/alien.model';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AliensService {

  constructor(private http: HttpClient) { }

  private url = 'api/aliens';

  // fetch aliens based on filter options
  getAliens(name: string, gender: number, includeActive: boolean): Observable<Alien[]> {
    let url = this.url + '?';
    if (name) {
      url += `name=${name}&`;
    }
    if (gender !== -1) {
      url += `gender=${gender}&`;
    }
    if (!includeActive) {
      url += `active=true`;
    }
    console.log(url);

    return this.http.get<Alien[]>(url).pipe(
      // tap(heroes => console.log('haha', heroes)),
      catchError(this.handleError('getAliens', []))
    );
  }

  // error handler
  handleError<T>(operation: string, result?: T) {
    return (err: any): Observable<T> => {
      console.log(`${operation} failed: ${err.message}`);
      return of(result as T);
    };
  }
}

