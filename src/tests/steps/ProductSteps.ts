import {binding, given} from "cucumber-tsflow"
import { DataTable } from "@cucumber/cucumber"
import Product from "../../entity/Product"
import { Repository } from "typeorm"
import myConnection from "../util/Connection"

@binding()
class ProductSteps {
    private productRepository: Repository<Product>
    
    constructor() {
        this.productRepository = myConnection.getRepository(Product)
    }

    @given("the following products exist:")
    public async theFollowingProductsExists(table: DataTable): Promise<void> { 
        var products: Product[] = []
        table.hashes().forEach(async (row: any) => {
            const product = new Product()
            product.sku = row.sku
            product.name = row.name
            product.price = row.price
            products.push(product)
        })
        await this.productRepository.save(products)
    }
}

export default ProductSteps
