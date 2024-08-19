const { Op } = require('sequelize');

class ClothesService {
    constructor(ClothesModel) {
        this.ClothesModel = ClothesModel;
    }

    async createClothes(data) {
        return this.ClothesModel.create(data);
    }

    async getAllClothes() {
        return this.ClothesModel.findAll();
    }

    async searchClothes(query) {
        return this.ClothesModel.findAll({ where: query });
    }

    async updateClothes(id, data) {
        const clothes = await this.ClothesModel.findByPk(id);
        if (clothes) {
            return clothes.update(data);
        }
        throw new Error('Clothes not found');
    }

    async deleteClothes(id) {
        const result = await this.ClothesModel.destroy({ where: { id } });
        if (!result) {
            throw new Error('Clothes not found');
        }
        return result;
    }

    async addStock(id, amount) {
        const clothes = await this.ClothesModel.findByPk(id);
        if (clothes) {
            clothes.stock += amount;
            return clothes.save();
        }
        throw new Error('Clothes not found');
    }

    async reduceStock(id, amount) {
        const clothes = await this.ClothesModel.findByPk(id);
        if (clothes) {
            clothes.stock = Math.max(0, clothes.stock - amount);
            return clothes.save();
        }
        throw new Error('Clothes not found');
    }

    async getOutOfStockClothes() {
        return this.ClothesModel.findAll({ where: { stock: 0 } });
    }

    async getLowStockClothes() {
        return this.ClothesModel.findAll({ where: { stock: { [Op.lt]: 5 } } });
    }
}

module.exports = ClothesService;
