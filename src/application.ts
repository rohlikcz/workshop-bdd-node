import { DataSource, Repository } from "typeorm"
import { SnakeNamingStrategy } from "typeorm-naming-strategies"
import CartDiscountAdder from "./application/CartDiscountAdder"
import CartLineAdder from "./application/CartlineAdder"
import Server from "./config/Server"
import CartController from "./controller/CartController"
import Cart from "./entity/Cart"
import Discount from "./entity/Discount"
import Product from "./entity/Product"

const connection : DataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ["dist/entity/*.js"],
    logging: false,
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy()
})

const cartRepository: Repository<Cart> = connection.getRepository(Cart)
const productRepository: Repository<Product> = connection.getRepository(Product)
const discountRepository: Repository<Discount> = connection.getRepository(Discount)
const cartLineAdder: CartLineAdder = new CartLineAdder(cartRepository, productRepository)
const cartDiscountAdder: CartDiscountAdder = new CartDiscountAdder(cartRepository, discountRepository)
const cartController = new CartController(cartLineAdder, cartDiscountAdder)
const server: Server = new Server(process.env.WEB_PORT, [cartController])

connection.initialize()
    .then(() => server.start())
    .catch((err: any) => console.error("Error during Data Source initialization:", err))
