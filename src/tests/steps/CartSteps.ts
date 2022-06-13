import {before, binding, given, then, when} from "cucumber-tsflow"
import { Repository } from "typeorm"
import myConnection from "../util/Connection"
import Cart from "../../entity/Cart"
import axios, { Axios } from 'axios'
import assert from "assert"
import CartLine from "../../entity/CartLine"
import Discount from "../../entity/Discount"

@binding()
class CartSteps {
    private cartRepository: Repository<Cart>
    private axios: Axios
    private currentCartId: number | undefined

    constructor() {
        this.cartRepository = myConnection.getRepository(Cart)
        this.axios = axios
    }

    @before()
    public setUp(): void {
        this.currentCartId = undefined
    }

    @given("I have a cart")
    public async haveCart(): Promise<void> {
        const cart: Cart = new Cart()
        await this.cartRepository.save(cart)
        this.currentCartId = cart.id
    }

    @when("I add {int} unit(s) of product {string} to my cart")
    public async addProductUnitsToMyCart(quantity: number, sku: string): Promise<void> {
        await this.axios.post(
            `http://${process.env.WEB_HOST}:${process.env.WEB_PORT}/carts/${this.currentCartId}/lines`,
            { sku: sku, quantity: quantity },
            {headers: {'Content-Type': 'application/json'}}
        )
    }

    @when("I remove product {string} of my cart")
    public async removeProductOfMyCart(sku: string): Promise<void> {
        throw "Step method not implemented"
    }

    @then("the cart's total cost should be {double} euro(s)")
    public async cartTotalCost(totalCost: number) {
        throw "Step method not implemented"
    }

    @then("there should be {int} unit(s) of product {string} in my cart")
    public async thereShouldBeProductUnitsInMyCart(quantity: number, sku: string) {
        throw "Step method not implemented"
    }

    @then("there shouldn't be product {string} in my cart")
    public async thereShouldNotBeProductInCart(sku: string) {
        const cart: Cart = await this.currentCart()
        const cartLine: CartLine|undefined = cart.lines.find((cartLine: CartLine) => cartLine.product.sku == sku)
        assert.equal(undefined, cartLine)
    }

    private currentCart(): Promise<Cart> {
        return this.cartRepository.findOneByOrFail({id: this.currentCartId})
    }
}

export default CartSteps
