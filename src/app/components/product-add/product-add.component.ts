import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {

 productAddForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
    private productService:ProductService,
    private toastrService:ToastrService) { 
    this.createProductAddForm();
  }

  ngOnInit(): void {
  }
  
  createProductAddForm(){
     this.productAddForm=this.formBuilder.group({
        productName:["",Validators.required],
        unitPrice:["",Validators.required],
        unitsInStock:["",Validators.required],
        categoryId:["",Validators.required]
      });
  }

  add(){

    if(this.productAddForm.valid){

      let productNodel=Object.assign({},this.productAddForm.value);
      this.productService.add(productNodel).subscribe(data=>{
        console.log(data);
        this.toastrService.success(data.message.toString(),"Ürün Eklendi");
      },errorMessage=>{
        //  console.log(errorMessage.error);
        if(errorMessage.error.Errors.length>0)
         {
           console.log(errorMessage.error.Errors);
           for (let i = 0; i < errorMessage.error.Errors.length; i++) 
           {
            this.toastrService.error("",errorMessage.error.Errors[i].ErrorMessage);
             
           }
        
         }
      });
   }
   else{
        this.toastrService.error("Hata","Girdiğiniz değerler eksik ya da hatalıdır");
    }
    }
}
