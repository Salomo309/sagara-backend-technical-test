const { createClothes, getAllClothes, searchClothes } = require('../controller/controller');
const { Clothes } = require('../models');

// Mock the Clothes model
jest.mock('../models', () => ({
  Clothes: {
    create: jest.fn(),
    findAll: jest.fn(),
    findByPk: jest.fn(),
    destroy: jest.fn(),
  },
}));

describe('Clothes Controller', () => {

  // Test createClothes
  describe('createClothes', () => {
    it('should create new clothes and return 200 with created clothes', async () => {
      const req = {
        body: { color: 'red', size: 'M', price: 100, stock: 50 }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockClothes = { id: 1, ...req.body };
      Clothes.create.mockResolvedValue(mockClothes);

      await createClothes(req, res);

      expect(Clothes.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockClothes);
    });

    it('should return 400 if creation fails', async () => {
      const req = { body: {} };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const errorMessage = 'Validation error';
      Clothes.create.mockRejectedValue(new Error(errorMessage));

      await createClothes(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  // Test getAllClothes
  describe('getAllClothes', () => {
    it('should return all clothes with 200 status', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockClothes = [
        { id: 1, color: 'red', size: 'M', price: 100, stock: 50 },
        { id: 2, color: 'blue', size: 'L', price: 120, stock: 30 }
      ];
      Clothes.findAll.mockResolvedValue(mockClothes);

      await getAllClothes(req, res);

      expect(Clothes.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockClothes);
    });

    it('should return 400 if fetching fails', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const errorMessage = 'Fetch error';
      Clothes.findAll.mockRejectedValue(new Error(errorMessage));

      await getAllClothes(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  // Test searchClothes
  describe('searchClothes', () => {
    it('should search clothes by color and size', async () => {
      const req = { query: { color: 'red', size: 'M' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockClothes = [{ id: 1, color: 'red', size: 'M', price: 100, stock: 50 }];
      Clothes.findAll.mockResolvedValue(mockClothes);

      await searchClothes(req, res);

      expect(Clothes.findAll).toHaveBeenCalledWith({ where: { color: 'red', size: 'M' } });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockClothes);
    });

    it('should return 400 if search fails', async () => {
      const req = { query: { color: 'red', size: 'M' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const errorMessage = 'Search error';
      Clothes.findAll.mockRejectedValue(new Error(errorMessage));

      await searchClothes(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
