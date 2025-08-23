import conf from "../conf/conf.js";
import { Client, ID,Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async getPosts(queries =  [Query.equal("status", "active")]) {
        try {
            const response = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
            return response.documents;
        } catch (error) {
            throw error;
        }
    }

    async getPostById(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            throw error;
        }
    }

    async createPost({title, slug, content, featuredImage,status, userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userId,
                    createdAt: new Date().toISOString(),
                },
            );
        } catch (error) {
            throw error;
        }
    }

    async updatePost(slug,{title, content, featuredImage,status,}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    updatedAt: new Date().toISOString(),
                }
            );
        } catch (error) {
            throw error;
        }
    }

    async deletePost( slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return { success: true, message: "Post deleted successfully." };
        } catch (error) {
            throw error;
        }
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            throw error;
        }
    }
    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            throw error;
        }
    }

    async getFilePreview(fileId) {
        try {
            return await this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            );
        } catch (error) {
            throw error;
        }
    }
}

const service = new Service();
export default service;