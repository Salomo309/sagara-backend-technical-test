const SequelizeMock = require('sequelize-mock');
const ClothesService = require('../service/service');

const DBConnectionMock = new SequelizeMock();
const ClothesMock = DBConnectionMock.define('clothes', {
    id: 1,
    color: 'Red',
    size: 'M',
    price: 100.00,
    stock: 10,
});

describe('ClothesService', () => {
    let clothesService;

    beforeEach(() => {
        clothesService = new ClothesService(ClothesMock);

        ClothesMock.findByPk = jest.fn().mockImplementation((id) => {
          return ClothesMock.findOne({ where: { id } });
      });
    });

    it('should create clothes', async () => {
        const clothesData = { color: 'Blue', size: 'L', price: 120.00, stock: 5 };
        ClothesMock.$queueResult(ClothesMock.build(clothesData));

        const result = await clothesService.createClothes(clothesData);

        expect(result.color).toBe('Blue');
        expect(result.size).toBe('L');
        expect(result.price).toBe(120.00);
        expect(result.stock).toBe(5);
    });

    it('should get all clothes', async () => {
        const result = await clothesService.getAllClothes();

        console.log(result)
        // expect(result).toHaveLength(1);
        expect(result.color).toBe('Blue');
    });

    it('should search clothes', async () => {
        const query = { color: 'Red' };
        ClothesMock.$queueResult([ClothesMock.build({ color: 'Red' })]);

        const result = await clothesService.searchClothes(query);

        expect(result).toHaveLength(1);
        expect(result[0].color).toBe('Red');
    });

    it('should update clothes', async () => {
        const updateData = { size: 'L' };
        const result = await clothesService.updateClothes(1, updateData);

        expect(result.size).toBe('L');
    });

    it('should delete clothes', async () => {
        ClothesMock.$queueResult(1);

        const result = await clothesService.deleteClothes(1);

        expect(result).toBe(1);
    });

    it('should add stock to clothes', async () => {
        const result = await clothesService.addStock(1, 5);

        expect(result.stock).toBe(15);
    });

    it('should reduce stock of clothes', async () => {
        const result = await clothesService.reduceStock(1, 5);

        expect(result.stock).toBe(5);
    });

    it('should get out of stock clothes', async () => {
        ClothesMock.$queueResult([ClothesMock.build({ stock: 0 })]);

        const result = await clothesService.getOutOfStockClothes();

        expect(result).toHaveLength(1);
        expect(result[0].stock).toBe(0);
    });

    it('should get low stock clothes', async () => {
        ClothesMock.$queueResult([ClothesMock.build({ stock: 4 })]);

        const result = await clothesService.getLowStockClothes();

        expect(result).toHaveLength(1);
        expect(result[0].stock).toBe(4);
    });
});
