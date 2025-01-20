import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1/region/africa';

  constructor(private http: HttpClient) {}

  getAfricanCountries(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap((response) => {
        console.log(response);
      }),
      catchError((error) => this.handleError(error, []))
    );
  }

  private handleError(error: Error, errorValue: any) {
    console.error(error);

    return of(errorValue);
  }
}
