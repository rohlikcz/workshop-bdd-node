import {binding, given} from "cucumber-tsflow"
import { Repository } from "typeorm"
import myConnection from "../util/Connection"
import Discount from "../../entity/Discount"

@binding()
class DiscountSteps {
    private discountRepository: Repository<Discount>
    
    constructor() {
        this.discountRepository = myConnection.getRepository(Discount)
    }

    @given("there is a cart discount {string} for {double} % with code {string}")
    public async thereIsACartDiscountWithCode(name: string, value: number, code: string): Promise<void> {
        const discount: Discount = new Discount(name, code, value)
        await this.discountRepository.save(discount)
    }
}

export default DiscountSteps
