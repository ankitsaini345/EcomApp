import { Component, OnInit } from '@angular/core';
import { IProduct, IProductResolver } from '../product';
import { ActivatedRoute, Router } from '@angular/router';
import { GetProductService } from '../get-product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: IProduct | undefined;
  errorMessage: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // const id = +this.route.snapshot.paramMap.get('id');
    // this.productService.getProduct(id).subscribe((product: IProduct) => this.product = product);
    const productData: IProductResolver = this.route.snapshot.data.productData;
    this.errorMessage = productData.error;
    this.product = productData.product;
  }
}
