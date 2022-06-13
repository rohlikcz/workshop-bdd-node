import { Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import CartLine from "./CartLine"
import Discount from "./Discount"

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
}

export default Cart
