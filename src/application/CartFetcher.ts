import { Repository } from "typeorm"
import Cart from "../entity/Cart"
import CartLine from "../entity/CartLine"
import Discount from "../entity/Discount"


class CartFetcher {
    private cartRepository: Repository<Cart>

    constructor(cartRepository: Repository<Cart>) {
        this.cartRepository = cartRepository
    }

    public async fetch(cartId: number): Promise<CartDetail> {
        const cart: Cart = await this.cartRepository.findOneByOrFail({id: cartId})
        
        return new CartDetail(
            cart.id,
            cart.totalPrice(),
            cart.lines.map((line: CartLine) => new Line(line.product.sku, line.product.name, line.quantity)),
            cart.discounts.map((discount: Discount) => discount.name)
        )
    }
}

class CartDetail {
    public id: number
    public total: number
    public lines: Line[]
    public discounts: string[]

    constructor(id: number, total:number, lines: Line[], discounts: string[]) {
        this.id = id
        this.total = total
        this.lines = lines
        this.discounts = discounts
    }
}

class Line {
    public sku: string
    public name: string
    public quantity: number

    constructor(sku: string, name: string, quantity: number) {
        this.sku = sku
        this.name = name
        this.quantity = quantity
    }
}

export default CartFetcher