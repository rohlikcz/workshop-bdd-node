import { Application, Request, Response } from "express"
import { Repository } from "typeorm"
import Controller from "../config/Controller"
import Cart from "../entity/Cart"
import Product from "../entity/Product"
import CartLine from "../entity/CartLine"
import CartDiscountAdder from "../application/CartDiscountAdder"

class CartController implements Controller {
    private cartRepository: Repository<Cart>
    private productRepository: Repository<Product>
    private cartDiscountAdder: CartDiscountAdder

    constructor(cartRepository: Repository<Cart>, productRepository: Repository<Product>, cartDiscountAdder: CartDiscountAdder) {
        this.cartRepository = cartRepository
        this.productRepository = productRepository
        this.cartDiscountAdder = cartDiscountAdder
    }

    private addLine = async (request: Request, response: Response): Promise<void> => {
        const { id } = request.params
        const { sku, quantity } = request.body

        if (quantity < 0) {
            throw "Negative quantity not allowed"
        }
        
        const cart: Cart = await this.cartRepository.findOneByOrFail({id: +id})
        const product: Product = await this.productRepository.findOneByOrFail({sku: sku})
        const cartLine: CartLine|undefined = cart.lines.find((cartLine: CartLine) => cartLine.product.sku == sku)

        if (!cartLine) {
            if (quantity > 0) {
                const newCartLine: CartLine = new CartLine()
                newCartLine.product = product
                newCartLine.cart = cart
                newCartLine.quantity = quantity
                cart.lines.push(newCartLine)
            }
        } else {
            if (quantity == 0) {
                cart.lines.splice(cart.lines.indexOf(cartLine), 1)
            } else {
                cartLine.quantity = quantity
            }
        }

        await this.cartRepository.save(cart)

        response.status(200).send()
    }

    private addDiscount = async (request: Request, response: Response): Promise<void> => {
        const { id } = request.params
        const { code } = request.body

        await this.cartDiscountAdder.add(+id, code)

        response.status(200).send()
    }

    public addRoutes(app: Application): void {
        app.post("/carts/:id/lines", this.addLine)
        app.post("/carts/:id/discounts", this.addDiscount)
    }
}

export default CartController
