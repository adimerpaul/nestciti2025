import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {

  public products = [
    {
      id: 1,
      name: 'Product 1',
      price: 100,
      description: 'Description of Product 1',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 200,
      description: 'Description of Product 2',
    },
  ];

  create(body, user) {
    const newProduct = {
      id: (this.products.length + 1),
      ...body,
      userId: user.id,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    const productIndex = this.products.findIndex(product => product.id === id);
    if (productIndex > -1) {
      this.products.splice(productIndex, 1);
      return { message: 'Producto eliminado correctamente' };
    }
    return { message: 'Producto no encontrado'}
  }
}
