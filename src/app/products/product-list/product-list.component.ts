import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product';
import { GetProductService } from '../get-product.service';


@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  imageWidth = 50;
  imageMargin = 2;
  filterBy='';
  constructor(private productService: GetProductService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(data => this.products = data);
  }

}
