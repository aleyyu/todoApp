import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Category } from '../model/category';
import { Todo } from '../model/todo';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http : HttpClient) { }

  path = "http://localhost:3000/categories"

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.path).pipe(
      tap(data=>console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  addCategory(cat : Category): Observable<Category[]>{
      return this.http.post<Category[]>(this.path, cat).pipe(
        tap(data=>console.log(JSON.stringify(data))),
        catchError(this.handleError)
      )
    }

  handleError(err: HttpErrorResponse){
    let errorMessage = ''
    if(err.error instanceof ErrorEvent){
        errorMessage = 'Bir hata oluştu.'+err.error.message
    }else{
      errorMessage = 'Sistemsel hata'
    }
    return throwError(errorMessage);
  }
}
