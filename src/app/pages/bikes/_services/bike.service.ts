import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// App import
import { environment } from '../../../../environments/environment';
import { Bike } from '../bike';

@Injectable({
  providedIn: 'root'
})
export class BikeService {
    private readonly apiUrl = environment.apiUrl;
    private bikesUrl = this.apiUrl + '/bikes';

    constructor(private http: HttpClient) { }
    
    /** GET bikes from bikes endpoint */
    getBikes (): Observable<Bike[]> {
        return this.http.get<Bike[]>(this.bikesUrl)
            .pipe(
                catchError(error => this.handleError(error))
            );
    }

    /** GET bike detail from bike-detail endpoint */
    getBikeDetail (id: number): Observable<Bike[]> {
        return this.http.get<Bike[]>(this.bikesUrl + `/${id}`)
            .pipe(
                catchError(error => this.handleError(error))
            );
    }

    /** POST bike to bikes endpoint */
    addBike (bike: Bike): Observable<Bike> {
        return this.http.post<Bike>(this.bikesUrl, bike)
            .pipe(
                catchError(error => this.handleError(error))
            );
    }

    /** PUT bike to bikes endpoint */
    updateBike (bike: Bike, id: number): Observable<Bike> {
        return this.http.put<Bike>(this.bikesUrl + `/${id}`, bike)
            .pipe(
                catchError(error => this.handleError(error))
            );
    }

    /** DELETE bike bike endpoint */
    deleteBike (id: number): Observable<Bike[]> {
        return this.http.delete<Bike[]>(this.bikesUrl + `/${id}`)
            .pipe(
                catchError(error => this.handleError(error))
            );
    }
    
    /** Vote on bike */
    voteOnBike (vote: any, bike: number): Observable<any> {
        const rating = vote;
        return this.http.post(this.bikesUrl + `/${bike}/ratings`, {rating})
            .pipe(
                catchError(error => this.handleError(error))
            );
    }
    
    /** Error handler */
    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side error.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend error.
            return throwError(error);
        }

        // return a custom error message
        return throwError('Something bad happened; please try again later.');
    }
    
}
