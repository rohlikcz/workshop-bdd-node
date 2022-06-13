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
        throw "Step method not implemented"
    }
}

export default ProductSteps
