import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-edit-tag',
  templateUrl: './product-edit-tag.component.html',
  styleUrls: ['./product-edit-tag.component.css']
})
export class ProductEditTagComponent implements OnInit {

  errorMessage: string;
  newTags = '';
  product: IProduct;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.parent.data.subscribe(data => {
      this.product = data.productData.product;
      this.errorMessage = data.productData.error;
    });
  }
// Add the defined tags
addTags(): void {
  if (!this.newTags) {
    this.errorMessage = 'Enter the search keywords separated by commas and then press Add';
  } else {
    const tagArray = this.newTags.split(',');
    this.product.tags = this.product.tags ? this.product.tags.concat(tagArray) : tagArray;
    this.newTags = '';
    this.errorMessage = '';
  }
}

// Remove the tag from the array of tags.
removeTag(idx: number): void {
  this.product.tags.splice(idx, 1);
}
}
