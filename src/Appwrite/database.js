import { Client, Databases, Storage,ID } from "appwrite";
import config from "../config/config.js";

class DatabaseService {
    client = new Client();
    databases;
    storage;
    constructor() {
        this.client
            .setEndpoint(config.appwriteEndpoint)
            .setProject(config.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }
    async createPost({title, slug, content, featuredImage, status, authorId}) {
        try {
            const response = await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    authorId
                }
            );
            return response;
        } catch (error) {
            throw new Error(`Failed to create post: ${error.message}`);
        }
    }
    async updatePost(slug, { title, content, featuredImage, status}) {
        try {
            const response = await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            );
            return response;
        } catch (error) {
            throw new Error(`Failed to update post: ${error.message}`);
        }
    }
}