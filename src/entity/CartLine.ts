import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import Cart from "./Cart"
import Product from "./Product"

@Entity("cart_lines")
class CartLine {
    @PrimaryGeneratedColumn({type: "int"})
    id: number

    @ManyToOne(() => Cart, cart => cart.lines)
    @JoinColumn({ name: "cart_id" })
    cart: Cart

    @ManyToOne(() => Product, {eager: true })
    @JoinColumn({ name: "product_sku" })
    product: Product

    @Column({ nullable: false, type: "int" })
    quantity: number
}

export default CartLine
