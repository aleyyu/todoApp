import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { Todo } from '../model/todo';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'category', 'action'];
  dataSource !: MatTableDataSource<Todo>;
  todos !: Todo[];
  todoForm !: FormGroup;

  todoTitle = "Todo List"

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private todoService: TodoService,
    private dialog: MatDialog,
    //private dialogRef: DialogRef<DialogComponent>
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //this.getAllTodo();
    this.activatedRoute.params.subscribe(params => {
      this.todoService.getTodo(params["categoryId"]).subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.todos = data;
      });
    })
  }

  // getAllTodo(){
  //   this.todoService.getTodo().subscribe({
  //     next:(res)=>{
  //       this.dataSource = new MatTableDataSource(res);
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;
  //     },
  //     error:(err)=>{
  //       alert("error")
  //     }
  //   })
  // }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe({
      next: (res) => {
        alert("deleted");
        //this.getAllTodo();
        this.ngOnInit();
      },
      error: () => {
        alert("error delete")
      }
    });
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        //this.getAllTodo();
        this.ngOnInit();
      }
    })
  }

  // addTodo() {
  //   if (this.todoForm.valid) {
  //     this.todoService.postTodo(this.todoForm.value).subscribe({
  //       next: (res) => {
  //         alert("todo added.");
  //         this.todoForm.reset();
  //         this.dialogRef.close();
  //       },
  //       error: () => {
  //         alert("error")
  //       }
  //     })
  //   }
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
