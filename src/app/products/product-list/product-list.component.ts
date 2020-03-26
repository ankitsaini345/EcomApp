import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product';
import { GetProductService } from '../get-product.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-productlist',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  filteredProduct: IProduct[] = [];
  imageWidth = 50;
  imageMargin = 2;
  _filterBy = '';

  get filterBy(): string {
    return this._filterBy;
  }

  set filterBy(val: string) {
    this._filterBy = val;
    this.filteredProduct = this._filterBy ? this.performFilter(this._filterBy) : this.products;
  }

  constructor(private productService: GetProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.productService.getProducts().subscribe(data => {
    //   this.products = data;
    //   this.filteredProduct = data;
    //   this.filterBy = this.route.snapshot.queryParamMap.get('filterBy') || '';
    // });
    this.products = this.route.snapshot.data.productList;
    this.filteredProduct = this.route.snapshot.data.productList;
    this.filterBy = this.route.snapshot.queryParamMap.get('filterBy') || '';
  }

  performFilter(val: string) {
    val = val.toLocaleLowerCase();
    return this.products.filter((product: IProduct) =>
      product.productName.toLocaleLowerCase().indexOf(val) !== -1);
  }

}
