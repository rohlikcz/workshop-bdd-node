import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity("discounts")
class Discount {
    @PrimaryGeneratedColumn({type: "int"})
    id: number

    @Column({ nullable: false })
    code: string

    @Column({ nullable: false })
    name: string

    @Column({ type: "float", nullable: false })
    value: number

    constructor(name: string, code: string, value: number) {
        this.name = name
        this.code = code
        this.value = value
    }
}

export default Discount
