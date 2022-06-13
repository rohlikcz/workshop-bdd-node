import { Application, Request, Response } from "express"
import Controller from "../config/Controller"
import CartDiscountAdder from "../application/CartDiscountAdder"
import CartLineAdder from "../application/CartlineAdder"
import CartFetcher from "../application/CartFetcher"

class CartController implements Controller {
    private cartLineAdder: CartLineAdder
    private cartDiscountAdder: CartDiscountAdder
    private cartFetcher: CartFetcher

    constructor(cartLineAdder: CartLineAdder, cartDiscountAdder: CartDiscountAdder, cartFetcher: CartFetcher) {
        this.cartLineAdder = cartLineAdder
        this.cartDiscountAdder = cartDiscountAdder
        this.cartFetcher = cartFetcher
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

    private recoverCartDetail = async (request: Request, response: Response): Promise<void> => {
        const { id } = request.params

        const cart = await this.cartFetcher.fetch(+id)

        response.status(200).send(cart)
    }

    public addRoutes(app: Application): void {
        app.post("/carts/:id/lines", this.addLine)
        app.post("/carts/:id/discounts", this.addDiscount)
        app.get("/carts/:id", this.recoverCartDetail)
    }
}

export default CartController
