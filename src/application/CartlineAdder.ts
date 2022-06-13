import { Repository } from "typeorm"
import Cart from "../entity/Cart"
import Product from "../entity/Product"

class CartLineAdder {
    private cartRepository: Repository<Cart>
    private productRepository: Repository<Product>

    constructor(cartRepository: Repository<Cart>, productRepository: Repository<Product>) {
        this.cartRepository = cartRepository
        this.productRepository = productRepository
    }

    public async add(cartId: number, sku: string, quantity: number): Promise<void> {
        const cart: Cart = await this.cartRepository.findOneByOrFail({id: cartId})
        const product: Product = await this.productRepository.findOneByOrFail({sku: sku})
        
        cart.addLine(product, quantity)

        await this.cartRepository.save(cart)
    }
}

export default CartLineAdder