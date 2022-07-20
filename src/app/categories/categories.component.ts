import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Category } from '../model/category';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(
    private catService : CategoryService,
    private dialog: MatDialog
    ) { }

  categoryTitle = "Todo Categories";
  categories !: Category[];
  catObj : Category = new Category();
  newCatValue : string = '';

  allcats : Category = new Category();

  ngOnInit(): void {

    this.allcats.id = 0;
    this.allcats.name = "Tüm İşler";

    this.catService.getCategories().subscribe(data=>{
      this.categories = data;
    });
  }

  getAllCategories(){
    this.catService.getCategories().subscribe(res => {
      //console.log(res);
    }, err => {
      alert("An error occured while getting todo list.")
    })
  }

  addCategory(){
      this.catObj.name = this.newCatValue;
      this.catService.addCategory(this.catObj).subscribe(res => {
        this.ngOnInit();
        this.newCatValue = '' + res;
        this.ngOnInit();
        this.newCatValue = '';
        alert("Category added successfully!");
      }, err => {
        alert("Unable to get the list of tasks.")
      });
  }

}
