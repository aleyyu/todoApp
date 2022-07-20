import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriesComponent } from '../categories/categories.component';
import { Category } from '../model/category';
import { CategoryService } from '../service/category.service';
import { TodoService } from '../service/todo.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(
    private catService : CategoryService,
    private formBuilder : FormBuilder,
    private todoService : TodoService,
    private dialogRef : MatDialogRef<DialogComponent>
    ) { }

  categories !: Category[];
  todoForm !: FormGroup;

  category !: string;

  //category_name = "";

  ngOnInit(): void {
    
    this.catService.getCategories().subscribe(data=>{
      this.categories = data;
    });
    this.todoForm = this.formBuilder.group({
      name : ['', Validators.required],
      description : ['', Validators.required],
      category : ['', Validators.required]
    })
    this.category = "bişeyler"
  }

  addTodo() {

    if (this.todoForm.valid) {
      this.todoService.addTodo(this.todoForm.value).subscribe({
        next: (res) => {
          this.todoForm.reset();
          this.dialogRef.close('save');
        },
        error: () => {
          alert("error")
        }
      })
    }
  }

}
