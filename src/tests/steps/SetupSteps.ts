import { after, before, binding } from "cucumber-tsflow"
import { DataTable } from "@cucumber/cucumber"
import { DataSource } from "typeorm"
import myConnection from "../util/Connection"

@binding()
class SetupSteps {
    private myConnection: DataSource

    constructor() {
        this.myConnection = myConnection
    }

    @before()
    public async regenerate(table: DataTable): Promise<void> {
        await this.myConnection.initialize()
    }

    @after()
    public async clearTables(table: DataTable): Promise<void> {
        await this.myConnection.createQueryRunner().clearDatabase()
        await this.myConnection.destroy()
    }
}

export default SetupSteps
