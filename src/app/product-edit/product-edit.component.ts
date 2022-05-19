import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProductService} from "../services/product.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productId! : string ;
  editProductGroup! : FormGroup;
  errorMessage! : string ;
  constructor(private fb : FormBuilder, private prodService : ProductService, private route : ActivatedRoute) { }
  ngOnInit(): void{
    this.productId=this.route.snapshot.params['id'];
    if(this.productId){
      this.prodService.getProduct(this.productId).subscribe({
        next :(data)=>{
          this.editProductGroup=this.fb.group({
            id : this.fb.control(data.id),
            name : this.fb.control(data.name),
            price : this.fb.control(data.price),
            promotion : this.fb.control(data.promotion),
          });
        },
       error : err => {
          console.log(err);
          this.errorMessage=err;
       }
      });
    }

  }

  handleUpdateProduct() {
    this.prodService.updateProduct(this.editProductGroup.value).subscribe({
      next : (data)=>{
        alert("Product has been successfully updated");
      }, error : err => {
        this.errorMessage=err;
      }
    })
  }
}
