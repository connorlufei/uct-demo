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
      catchError(this.handleError<Alien[]>('getAliens', []))
    );
  }

  newAlien(alien: Alien): Observable<Alien> {
    console.log('service', alien);
    return this.http.post<Alien>(this.url, alien, httpOptions).pipe(
      catchError(this.handleError<Alien>('newAlien'))
    );
  }

  deleteAlien(alien: Alien | number) {
    const id = typeof alien === 'number' ? alien : alien.id;
    const url = `${this.url}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError<Alien>('deleteAlien'))
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

