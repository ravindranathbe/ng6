import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// App import
import { environment } from '../../../../environments/environment';
import { Builder } from '../builder';

@Injectable({
  providedIn: 'root'
})
export class BuilderService {
    private readonly apiUrl = environment.apiUrl;
    private buildersUrl = this.apiUrl + '/builders';
    constructor(private http: HttpClient) { }
    
    /** GET builders from builders endpoint */
    getBuilders (): Observable<Builder[]> {
        return this.http.get<Builder[]>
            (this.buildersUrl)
                .pipe(catchError(error => this.handleError(error)));
    }

    /** GET builder detail from builder-detail endpoint*/
    getBuilderDetail (id: number):
        Observable<Builder[]> {
            return this.http.get<Builder[]>(this.buildersUrl + `/${id}`)
                .pipe(catchError(error => this.handleError(error)));
    }

    /** POST builder to builders endpoint */
    addBuilder (builder: Builder):
        Observable<Builder> {
            return this.http.post<Builder>(this.buildersUrl, builder)
                .pipe(catchError(error => this.handleError(error)));
    }
    
    /** PUT builder to builders endpoint */
    updateBuilder (builder: Builder, id: number):
        Observable<Builder> {
            return this.http.put<Builder>(this.buildersUrl + `/${id}`, builder)
                .pipe(catchError(error => this.handleError(error)));
        }

    /** DELETE builder builder endpoint */
    deleteBuilder (id: number): Observable<Builder[]> {
        return this.http.delete<Builder[]>(this.buildersUrl + `/${id}`)
            .pipe(catchError(error => this.handleError(error)));
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
