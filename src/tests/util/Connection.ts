import { DataSource } from "typeorm"
import { SnakeNamingStrategy } from "typeorm-naming-strategies"
import {} from "../../../environment"

export default new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ["src/entity/*.ts"],
    logging: false,
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy()
})