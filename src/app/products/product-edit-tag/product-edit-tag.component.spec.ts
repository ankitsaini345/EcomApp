import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditTagComponent } from './product-edit-tag.component';

describe('ProductEditTagComponent', () => {
  let component: ProductEditTagComponent;
  let fixture: ComponentFixture<ProductEditTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductEditTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEditTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
