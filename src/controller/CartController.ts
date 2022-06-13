import { Application, Request, Response } from "express"
import Controller from "../config/Controller"
import CartDiscountAdder from "../application/CartDiscountAdder"
import CartLineAdder from "../application/CartlineAdder"

class CartController implements Controller {
    private cartLineAdder: CartLineAdder
    private cartDiscountAdder: CartDiscountAdder

    constructor(cartLineAdder: CartLineAdder, cartDiscountAdder: CartDiscountAdder) {
        this.cartLineAdder = cartLineAdder
        this.cartDiscountAdder = cartDiscountAdder
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

        await this.cartDiscountAdder.add(+id, code)

        response.status(200).send()
    }

    public addRoutes(app: Application): void {
        app.post("/carts/:id/lines", this.addLine)
        app.post("/carts/:id/discounts", this.addDiscount)
    }
}

export default CartController
