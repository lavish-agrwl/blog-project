import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(config.appwriteEndpoint)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount(email, password) {
        try {
            const response = await this.account.create(
                ID.unique(),
                email,
                password
            );
            return response;
        } catch (error) {
            throw new Error(`Failed to create account: ${error.message}`);
        }
    }

    async login(email, password) {
        try {
            const response = await this.account.createEmailSession(email, password);
            return response;
        } catch (error) {
            throw new Error(`Failed to login: ${error.message}`);
        }
    }

    async logout() {
        try {
            await this.account.deleteSession("current");
        } catch (error) {
            throw new Error(`Failed to logout: ${error.message}`);
        }
    }

    async getAccount() {
        try {
            const response = await this.account.get();
            return response;
        } catch (error) {
            throw new Error(`Failed to get account: ${error.message}`);
        }
    }

}

const authService = new AuthService();
export default authService;