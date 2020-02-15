import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product';
import { ActivatedRoute, Router } from '@angular/router';
import { GetProductService } from '../get-product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: IProduct | undefined;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: GetProductService) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProduct(id).subscribe((product: IProduct) => this.product = product);
  }
  onBack(): void {
    this.router.navigate(['/products']);
  }

}
