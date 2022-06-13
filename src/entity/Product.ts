import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity("products")
class Product {
    @PrimaryColumn()
    sku: string

    @Column({ nullable: false })
    name: string

    @Column({ type: "float", nullable: false })
    price: number
}

export default Product
