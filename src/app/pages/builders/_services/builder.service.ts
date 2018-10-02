import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// App import
import { environment } from '../../../../environments/environment';
import { Builder } from '../builder';
import { HttpHandleError, HandleError } from '../../../pages/shared/_services/http-handle-error.service';

@Injectable({
  providedIn: 'root'
})
export class BuilderService {
    private readonly apiUrl = environment.apiUrl;
    private buildersUrl = this.apiUrl + '/builders';
	private handleError: HandleError;
	
    constructor(private http: HttpClient, httpErrorHandler: HttpHandleError) {
		this.handleError = httpErrorHandler.createHandleError('BuildersService');
	}
    
    /** GET builders from builders endpoint */
    getBuilders (): Observable<Builder[]> {
        return this.http.get<Builder[]>
            (this.buildersUrl)
                .pipe(catchError(this.handleError('getBuilders', [])));
    }

    /** GET builder detail from builder-detail endpoint*/
    getBuilderDetail (id: number): Observable<Builder[]> {
		return this.http.get<Builder[]>(this.buildersUrl + `/${id}`)
			.pipe(catchError(this.handleError('getBuilderDetail', [])));
    }

    /** POST builder to builders endpoint */
    addBuilder (builder: Builder): Observable<Builder> {
		return this.http.post<Builder>(this.buildersUrl, builder)
			.pipe(catchError(this.handleError('addBuilder', builder)));
    }
    
    /** PUT builder to builders endpoint */
    updateBuilder (builder: Builder, id: number): Observable<Builder> {
		return this.http.put<Builder>(this.buildersUrl + `/${id}`, builder)
			.pipe(catchError(this.handleError('updateBuilder', builder)));
	}

    /** DELETE builder builder endpoint */
    deleteBuilder (id: number): any { // Observable<Builder[]>
        // return this.http.delete<Builder[]>(this.buildersUrl + `/${id}`)
           // .pipe(catchError(this.handleError('deleteBuilder')));
    }

    /** Error handler */
    /* private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side error.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend error.
            return throwError(error);
        }
        
        // return a custom error message
        return throwError('Something bad happened; please try again later.');
    } */

}
