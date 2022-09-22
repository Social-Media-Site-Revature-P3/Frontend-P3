import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {


  searchTerm: string = "";


  constructor() { }

  ngOnInit(): void {
  }


  searchUser() {
    console.log("searching products by name")
    console.log(this.searchTerm)
    // if(this.searchTerm.length > 0) {
    //   this.productServe.GetProductByName(this.searchTerm).subscribe((uwu:Product[]) => {
    //     this._product = uwu
    //     console.log(this._product)
    //   })
    // } else {
    //   this.getProducts();
    // }
    }
}
