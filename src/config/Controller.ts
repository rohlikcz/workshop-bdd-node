import { Application } from "express"

interface Controller {
    addRoutes(app: Application): void
}

export default Controller
