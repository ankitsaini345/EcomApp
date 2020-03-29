export interface IProduct {
  id: number;
  productName: string;
  productCode: string;
  releaseDate: string;
  price: number;
  description: string;
  starRating: number;
  imageUrl: string;
  tags?: string[];
  category?: string;
}

export interface IProductResolver {
  product: IProduct;
  error?: any;
}
