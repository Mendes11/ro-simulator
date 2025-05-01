import nextEnv from "@next/env";
const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd(), true);
import OpenAI from "openai";

const client = new OpenAI();

async function cleanupOpenAIStorage() {
    try {
        // List all files
        const fileList = await client.files.list();
        if (!fileList.data.length) {
            console.log("No files found in OpenAI storage.");
            return;
        }
        console.log(`Found ${fileList.data.length} files. Deleting...`);

        for (const file of fileList.data) {
            if (file.purpose !== "batch") continue;
            try {
                await client.files.del(file.id);
                console.log(`Deleted file: ${file.id} (${file.filename})`);
            } catch (err) {
                console.error(`Failed to delete file ${file.id}:`, err);
            }
        }
        console.log("Cleanup complete.");
    } catch (err) {
        console.error("Error cleaning up OpenAI storage:", err);
    }
}

cleanupOpenAIStorage();
