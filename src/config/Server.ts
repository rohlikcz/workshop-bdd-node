import express, { Application, NextFunction, Request, Response } from "express"
import Controller from "./Controller"
import "express-async-errors"

class Server {
    private port: number
    private controllers: Controller[]
    private app: Application

    constructor(port: number, controllers: Controller[]) {
        this.port = port
        this.controllers = controllers
        this.app = express()
        this.configuration()
        this.routes()
        this.errorHandling()
    }
  
    public configuration() {
        this.app.set("port", this.port)
        this.app.use(express.json())
    }
  
    public routes() {
        this.controllers.forEach((controller: Controller) => controller.addRoutes(this.app))
    }

    public start() {
        this.app.listen(this.port, () => console.log(`Server is listening ${this.port} port.`))
    }

    private errorHandling() {
        this.app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
            console.log(`Error on ${request.url}:`)
            console.log(error)
            response.status(500).json({error: error.message});
        })
    }
}

export default Server
