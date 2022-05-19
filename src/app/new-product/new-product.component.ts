import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  newProductFormGroup! : FormGroup;
  constructor(private fb : FormBuilder, private productService:ProductService) { }

  ngOnInit(): void {
    this.newProductFormGroup=this.fb.group({
      name : this.fb.control(null,[Validators.required, Validators.minLength(5)]),
      price : this.fb.control(0, [Validators.required]),
      promoted : this.fb.control(false)
    });
  }

  handleSaveProduct() {
    let product=this.newProductFormGroup.value;
    this.productService.saveProduct(product).subscribe({
      next :(data)=>{
        alert("Product saved successfully");
        this.newProductFormGroup.reset();
      }
    });
  }
  getErrorMessage(field:string, error:any):string{
    if(error['required']){
      return field +" is Required";
    } else if(error['minlength']){
      return field+" should have at least "+error['minlength']['requiredLength']+" Characters";
    } else return "";
  }
}
