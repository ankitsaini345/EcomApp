import { Component, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../product';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-edit-info',
  templateUrl: './product-edit-info.component.html',
  styleUrls: ['./product-edit-info.component.css']
})
export class ProductEditInfoComponent implements OnInit {

  @ViewChild(NgForm, { static: true }) productForm: NgForm;
  product: IProduct;
  errorMessage: '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.parent.data.subscribe(data => {
      if (this.productForm) {
        this.productForm.reset();
      }
      this.product = data.productData.product;
    });
  }

}
