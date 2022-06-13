import { Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import CartLine from "./CartLine"
import Discount from "./Discount"
import Product from "./Product"

@Entity("carts")
class Cart {
    @PrimaryGeneratedColumn({type: "int"})
    id: number

    @OneToMany(() => CartLine, line => line.cart, {cascade: true, eager: true})
    lines: CartLine[]

    @ManyToMany(() => Discount, {cascade: true, eager: true})
    @JoinTable({
        name: "cart_discounts",
        joinColumn: {
            name: "cart_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "discount_id",
            referencedColumnName: "id"
        }
    })
    discounts: Discount[]

    public addLine(product: Product, quantity: number): void {
        if (quantity < 0) {
            throw "Negative quantity not allowed"
        }

        const cartLine: CartLine|undefined = this.lines.find((cartLine: CartLine) => cartLine.product.sku == product.sku)

        if (!cartLine) {
            if (quantity > 0) {
                const newCartLine: CartLine = new CartLine()
                newCartLine.product = product
                newCartLine.cart = this
                newCartLine.quantity = quantity
                this.lines.push(newCartLine)
            }
        } else {
            if (quantity == 0) {
                this.lines.splice(this.lines.indexOf(cartLine), 1)
            } else {
                cartLine.quantity = quantity
            }
        }
    }

    private totalLinesPrice(): number {
        return this.lines
            .map((cartLine: CartLine) => cartLine.quantity * cartLine.product.price)
            .reduce((carry: number, current: number) => carry + current, 0)
    }

    private totalDiscountsPrice(): number {
        return this.discounts
            .map((discount: Discount) => discount.value)
            .reduce((carry: number, current: number) => carry + current, 0)
    }

    public totalPrice(): number {
        return Math.max(
            0,
            Math.round((this.totalLinesPrice() - this.totalDiscountsPrice()) * 100) / 100
        )
    }

    public quantityOfProduct(sku: string): number {
        const cartLine: CartLine|undefined = this.lines.find((cartLine: CartLine) => cartLine.product.sku == sku)
        return cartLine ? cartLine.quantity : 0
    }

    public hasDiscount(name: string): boolean {
        const discount: Discount|undefined = this.discounts.find((discount: Discount) => discount.name == name)
        return discount ? true : false
    }

    public applyDiscount(discount: Discount): void {
        const foundDiscount: Discount|undefined = this.discounts.find((currentDiscount: Discount) => currentDiscount.id == discount.id)

        if (foundDiscount) {
            throw "Discount already applied"
        }

        this.discounts.push(discount)
    }
}

export default Cart
