import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Alien } from '../models/alien.model';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, delay } from 'rxjs/operators';

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

  getAlienById(id: number): Observable<Alien> {
    const url = `${this.url}/${id}`;
    return this.http.get<Alien>(url);
  }

  newAlien(alien: Alien): Observable<Alien> {
    return this.http.post<Alien>(this.url, alien);
  }

  updateAlien(alien: Alien): Observable<Alien> {
    return this.http.put<Alien>(this.url, alien);
  }

  deleteAlien(alien: Alien | number): Observable<Alien> {
    const id = typeof alien === 'number' ? alien : alien.id;
    const url = `${this.url}/${id}`;
    return this.http.delete<Alien>(url);
  }

  isAlienCodeTaken(code: string): Observable<boolean> {
    return this.getAliens('', -1, true).pipe(map(aliens => aliens.find(item => item.code === code) !== undefined),
      delay(1000));
  }

  // error handler
  handleError<T>(operation: string, result?: T) {
    return (err: any): Observable<T> => {
      console.log(`${operation} failed: ${err.message}`);
      return of(result as T);
    };
  }
}


export interface User {
  id: number;
  name: string;
}
