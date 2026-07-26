import { getProducts } from '../getProducts';
import { productRepository } from '../../repositories/productRepository';

jest.mock('../../repositories/productRepository', () => ({
  productRepository: {
    findAll: jest.fn(),
  },
}));

describe('getProducts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all products', async () => {
    const mockProducts = [
      { id: 'prod-1', name: 'Product 1', price: 100, stock: 5 },
      { id: 'prod-2', name: 'Product 2', price: 200, stock: 10 },
    ];

    (productRepository.findAll as jest.Mock).mockResolvedValue(mockProducts);

    const result = await getProducts();

    expect(result).toEqual(mockProducts);
    expect(productRepository.findAll).toHaveBeenCalled();
  });

  it('should return empty array when no products exist', async () => {
    (productRepository.findAll as jest.Mock).mockResolvedValue([]);

    const result = await getProducts();

    expect(result).toEqual([]);
    expect(Array.isArray(result)).toBe(true);
  });

  it('should call productRepository.findAll once', async () => {
    (productRepository.findAll as jest.Mock).mockResolvedValue([]);

    await getProducts();

    expect(productRepository.findAll).toHaveBeenCalledTimes(1);
  });
});
