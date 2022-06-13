import { Application, Request, Response } from "express"
import Controller from "../config/Controller"
import CartDiscountAdder from "../application/CartDiscountAdder"
import CartLineAdder from "../application/CartlineAdder"

class CartController implements Controller {
    private cartLineAdder: CartLineAdder
    private CartDiscountAdder: CartDiscountAdder

    constructor(cartLineAdder: CartLineAdder, cartDiscountAdder: CartDiscountAdder) {
        this.cartLineAdder = cartLineAdder
        this.CartDiscountAdder = cartDiscountAdder
    }

    private addLine = async (request: Request, response: Response): Promise<void> => {
        const { id } = request.params
        const { sku, quantity } = request.body
        
        await this.cartLineAdder.add(+id, sku, +quantity)

        response.status(200).send()
    }

    private addDiscount = async (request: Request, response: Response): Promise<void> => {
        const { id } = request.params
        const { code } = request.body

        await this.CartDiscountAdder.add(+id, code)

        response.status(200).send()
    }

    public addRoutes(app: Application): void {
        app.post("/carts/:id/lines", this.addLine)
        app.post("/carts/:id/discounts", this.addLine)
    }
}

export default CartController
