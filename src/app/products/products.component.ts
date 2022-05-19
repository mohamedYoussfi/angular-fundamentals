import { Component, OnInit } from '@angular/core';
import {Product} from "../model/products.model";
import {ProductService} from "../services/product.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products!: Array<Product>;
  errorMessage :string | undefined;
  searchProductFormGroup! : FormGroup;
  selectedProducts:Product[]=[];
  selectMode:boolean=false;
  selection:string="all";
  currentPage :number= 0;
  pageSize : number =5;
  totalPages! : number;
  currentAction! :string;
  constructor(private productsService : ProductService, private fb:FormBuilder, private router: Router) {
  }
  ngOnInit(): void {
    this.searchProductFormGroup=this.fb.group({
      keyword : this.fb.control("")
    });
    console.log("Products component => ngOnInit");
    this.handleGetAllProducts();
  }
  handleDeleteProduct(p: Product) {
    this.currentAction="handleDeleteProduct";
    this.productsService.deleteProduct(p.id).subscribe({
      next : (data)=>{
        let index=this.products.indexOf(p);
        this.products.splice(index,1);
      },
      error : err => {
        this.errorMessage=err.error;
      }
    }
    );
  }


  handleSearchProducts() {
    let keyword=this.searchProductFormGroup.value.keyword
    this.productsService.searchProducts(keyword,this.currentPage,this.pageSize).subscribe({
      next : (data)=>{
        this.products=data.products;
        this.totalPages=data.totalPages;
      },
      error : err => {
        this.errorMessage=err.error;
      }
    });
  }

  newProduct() {
    this.router.navigateByUrl("/newProduct")
  }

  handlePromoteProduct(product: Product) {
    let value=product.promotion;
    this.productsService.switchProductPromotion(product.id).subscribe({
      next : data=>{
        product.promotion=!value;
      },
      error : err => {
        this.errorMessage=err.error;
      }
    })
  }

  getPromotedProducts() {
    console.log("getPromotedProducts");
    this.currentAction="getPromotedProducts";
    this.productsService.getPromotedProducts(this.currentPage, this.pageSize).subscribe({
      next : (data)=>{
        this.products=data.products;
        this.totalPages=data.totalPages;
      },
      error : err => {
        this.errorMessage=err.error;
      }
    });
  }


  select(p: Product) {
    if(p.selected ==undefined || p.selected==false){
      p.selected=true;
      this.selectedProducts.push(p);
    } else {
     p.selected=false;
     let index=this.selectedProducts.indexOf(p);
     this.selectedProducts.splice(index,1);
    }
  }

  setSelection(mode : boolean) {
    this.selectMode=mode;
    this.selectedProducts=[];
    this.products.forEach(p=>{
      if(this.selection==='all'){
        p.selected=this.selectMode;
      } else if(this.selection==='promo'){
        if(p.promotion==true){
          p.selected=this.selectMode
        } else {
          p.selected=false;
        }
      }
      if(p.selected==true){
        this.selectedProducts.push(p);
      } else {
        let index=this.selectedProducts.indexOf(p);
        this.selectedProducts.splice(index,1);
      }
    });
  }

  handleDeleteSelection() {
    this.productsService.deleteListProducts(this.selectedProducts).subscribe({
      next : (data)=>{
        for(let p of this.selectedProducts){
          let index=this.products.indexOf(p);
          this.products.splice(index,1);
        }
      }
    })
  }

  handlePromotion() {
    this.productsService.promoteProducts(this.selectedProducts).subscribe({
      next : (data)=>{
        this.selectedProducts.forEach(p=>{
          p.promotion=true;
        })
      }
    })
  }

  goToPage(page : number) {
    this.currentPage=page;
    if(this.currentAction==='getPromotedProducts'){
      this.getPromotedProducts();
    }else{
      this.handleSearchProducts();
    }
  }

  handleGetAllProducts() {
    this.currentAction="handleGetAllProducts"
    this.searchProductFormGroup.controls['keyword'].setValue("");
    this.handleNewReSearch();
  }

  handleNewReSearch() {
    this.handleSearchProducts();
    this.currentPage=0;
  }

  handleEditProduct(p: Product) {
    this.router.navigateByUrl("/editProduct/"+p.id);
  }
}
