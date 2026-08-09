import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const deleteUTFiles = async (fileKey: string) => {
    try {
        const key = fileKey.split("/f/")[1];
        await utapi.deleteFiles(key);
    } catch (error) {
        console.log("UTApi: Failed to delete image: ", error);
    }
}