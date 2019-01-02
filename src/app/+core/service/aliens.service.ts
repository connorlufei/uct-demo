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

  getAliens(): Observable<Alien[]> {
    return this.http.get<Alien[]>(this.url).pipe(
      catchError(this.handleError('getAliens', []))
    );
  }

  handleError<T>(operation: string, result?: T) {
    return (err: any): Observable<T> => {
      console.log(`${operation} failed: ${err.message}`);
      return of(result as T);
    };
  }
}

