class ClothesController {
    constructor(clothesService) {
        this.clothesService = clothesService;
    }

    async createClothes(req, res) {
        try {
            const newClothes = await this.clothesService.createClothes(req.body);
            res.status(200).json(newClothes);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getAllClothes(req, res) {
        try {
            const clothes = await this.clothesService.getAllClothes();
            res.json(clothes);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async searchClothes(req, res) {
        try {
            const clothes = await this.clothesService.searchClothes(req.query);
            res.json(clothes);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateClothes(req, res) {
        try {
            const clothes = await this.clothesService.updateClothes(req.params.id, req.body);
            res.json(clothes);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async deleteClothes(req, res) {
        try {
            await this.clothesService.deleteClothes(req.params.id);
            res.json({ message: 'Clothes deleted' });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async addStock(req, res) {
        try {
            const clothes = await this.clothesService.addStock(req.params.id, req.body.amount);
            res.json(clothes);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async reduceStock(req, res) {
        try {
            const clothes = await this.clothesService.reduceStock(req.params.id, req.body.amount);
            res.json(clothes);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getOutOfStockClothes(req, res) {
        try {
            const clothes = await this.clothesService.getOutOfStockClothes();
            res.json(clothes);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async getLowStockClothes(req, res) {
        try {
            const clothes = await this.clothesService.getLowStockClothes();
            res.json(clothes);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = ClothesController;
