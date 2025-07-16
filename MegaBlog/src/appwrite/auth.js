import conf from "../conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);        
    }

    async createAccount({email, password, name}) {
        try {
            const response = await this.account.create(ID.unique(), email, password, name);
            if(response) {
                // return response;
                return this.login({email, password}); // Automatically log in after account creation
            }
            else{
                return response;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
            
        } catch (error) {
            throw error;
        }
    }

    async setCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
        return null;
    }
    async logout() {
        try {
            // return await this.account.deleteSession('current');
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service:: logout error", error);
            ;
        }
    }
}

const authService = new AuthService();

export default AuthService;