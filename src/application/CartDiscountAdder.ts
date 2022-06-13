import { Repository } from "typeorm"
import Cart from "../entity/Cart"
import Discount from "../entity/Discount"

class CartDiscountAdder {
    private cartRepository: Repository<Cart>
    private discountRepository: Repository<Discount>

    constructor(cartRepository: Repository<Cart>, discountRepository: Repository<Discount>) {
        this.cartRepository = cartRepository
        this.discountRepository = discountRepository
    }

    public async add(cartId: number, code: string): Promise<void> {
        const cart: Cart = await this.cartRepository.findOneByOrFail({id: cartId})
        const discount: Discount = await this.discountRepository.findOneByOrFail({code: code})

        cart.applyDiscount(discount)

        await this.cartRepository.save(cart)
    }
}

export default CartDiscountAdder