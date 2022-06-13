import { before, binding, then, when } from "cucumber-tsflow"
import axios, { Axios, AxiosResponse } from 'axios'
import assert from "assert"

@binding()
class HttpSteps {
    private axios: Axios
    private response: AxiosResponse|undefined;

    constructor() {
        this.axios = axios
    }

    @before()
    public setUp(): void {
        this.response = undefined;
    }

    @when("I send a {string} request to {string}")
    public async sendARequestWithBodyToWith(method: string, path: string): Promise<void> {
        this.response = await this.axios.request({
            method: method,
            baseURL: `http://${process.env.WEB_HOST}:${process.env.WEB_PORT}`,
            url: path
        })
    }

    @then("the response status should be {int} with body:")
    public async theResponseStatusAndBodyShouldBe(status: number, body: string): Promise<void> {
        assert.equal(this.response?.status, status)
        assert.equal(JSON.stringify(this.response?.data), JSON.stringify(JSON.parse(body)))
    }
}

export default HttpSteps
