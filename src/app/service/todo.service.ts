import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Todo } from '../model/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http : HttpClient) { }

  path = "http://localhost:3000/todos"

  getTodo(categoryId:number): Observable<Todo[]> {

    let newPath = this.path;
    if(categoryId){
      newPath += "?categoryId="+categoryId;
    }
    
    return this.http.get<Todo[]>(newPath).pipe(
      tap(data=>console.log(JSON.stringify(data))),
    );
  }

  addTodo(todo : Todo){
    return this.http.post<Todo>(this.path, todo);
  }

  // getTodo(){
  //   return this.http.get<Todo[]>(this.path);
  // }

  deleteTodo(id : number){
    return this.http.delete<Todo>(this.path + '/' +id);
  }
}
