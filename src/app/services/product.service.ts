import { Injectable } from '@angular/core';
import {PageProducts, Product} from "../model/products.model";
import {Observable, of, throwError} from "rxjs";
import {UUID} from "angular2-uuid";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products! : Product[];
  constructor() {
    this.loadInitialProducts();
  }

  public loadInitialProducts(){
    this.products=[
      {id : UUID.UUID(), name : "Computer", price : 5400, promotion :true},
      {id : UUID.UUID(), name : "Printer", price : 1200, promotion : false},
      {id : UUID.UUID(), name : "Smart phone", price : 9000, promotion : true},
    ];
    for (let i = 4; i <20 ; i++) {
      this.products.push({id : UUID.UUID(), name : "Computer", price : 5400, promotion :true},)
      this.products.push({id : UUID.UUID(), name : "Printer", price : 1200, promotion : false})
      this.products.push({id : UUID.UUID(), name : "Smart phone", price : 9000, promotion : true})
    }
  }

  public getProducts():Observable<Product[]>{
    let rnd = Math.random();
    if(rnd<0.15) {
      return throwError(()=>new Error("Network error => 404"));
    }
    return of([...this.products]);
  }

  public deleteProduct(id : string):Observable<boolean>{
    this.products=this.products.filter(p=>p.id!=id);
    return of(true);
  }
  public deleteListProducts(products : Product[]){
    this.products=this.products.filter(prod=> products.find(p=>p.id==prod.id)==null);
    return of(true);
  }
  public searchProducts(name:string, page: number, size :number){
    let searchedList=this.products
      .filter(p=>p.name.includes(name));
    let totalPages=~~(searchedList.length/size);
    if(searchedList.length % size !=0) totalPages++;
    let index = page*size;
    let result=searchedList.slice(index,index+size);
    let pageProducts:PageProducts ={
      page : page, size : size, totalPages : totalPages, products : result
    }
    return of(pageProducts);
  }
  public getPromotedProducts(page : number, size : number){
    let products=this.products.filter(p=>p.promotion==true);
    let totalPages=~~(products.length/size);
    if(products.length % size !=0) totalPages++;
    let index = page*size;
    let result=products.slice(index,index+size);
    let pageProducts:PageProducts ={
      page : page, size : size, totalPages : totalPages, products : result
    }
    return of(pageProducts);
  }
  public saveProduct(product:Product) :Observable<Product>{
    product.id=UUID.UUID();
    this.products.push(product);
    return of(product);
  }
  public switchProductPromotion(id :string):Observable<boolean> {
    let products=this.products.filter(p=>p.id==id);
    if(products.length==1) {
      products[0].promotion=!products[0].promotion;
    } else {
      return throwError(()=>new Error("Product not found"))
    }
    return of(true);
  }

  public promoteProducts(products : Product[]):Observable<boolean> {
    let prods = this.products.filter(p=>products.find(pr=>pr.id==p.id)!=null);
    prods.forEach(p=>{
      p.promotion=true;
    })
    return of(true);
  }

}
