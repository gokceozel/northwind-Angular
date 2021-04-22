import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartItem';
import { CartItems } from '../models/cartItems';
import { Product } from '../models/product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addToCart(product:Product){
    let item=CartItems.find(x=>x.product.productId==product.productId);
    if(item){
      item.quantity +=1;
    }else{
      let cartItem=new CartItem();
      cartItem.quantity=1;
      cartItem.product=product;
      CartItems.push(cartItem);
    }
  }


   list():CartItem[]{
     return CartItems;
   }

   removeFromCart(product:Product){
    let item:CartItem=CartItems.find(x=>x.product.productId==product.productId);
    CartItems.splice(CartItems.indexOf(item),1);
   }

}
