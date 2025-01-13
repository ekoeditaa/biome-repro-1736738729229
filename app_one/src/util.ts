import { randomBytes } from "crypto";
import { join } from "path";
import { format } from "util";
import { readFile, writeFile } from "fs/promises";

/**
 * Reads a file and generates a unique filename with a random prefix
 * @param originalPath Original file path
 * @returns Object with original and new file paths
 */
export const generateUniqueFilename = async (originalPath: string) => {
	const randomPrefix = randomBytes(4).toString("hex");
	const fileExtension = originalPath.split(".").pop();
	const newFilename = `${randomPrefix}.${fileExtension}`;
	const newPath = join(process.cwd(), newFilename);

	return {
		originalPath,
		newPath,
	};
};

/**
 * Safely writes content to a file with error handling
 * @param filePath Path to write the file
 * @param content Content to write
 */
export const safeFileWrite = async (filePath: string, content: string) => {
	try {
		await writeFile(filePath, content, "utf8");
		console.log(format("Successfully wrote to file: %s", filePath));
	} catch (error) {
		console.error(
			format(
				"Error writing to file: %s",
				error instanceof Error ? error.message : "Unknown error",
			),
		);
	}
};

/**
 * Reads file content with robust error handling
 * @param filePath Path to read the file from
 * @returns File content or null if error occurs
 */
export const safeFileRead = async (
	filePath: string,
): Promise<string | null> => {
	try {
		const content = await readFile(filePath, "utf8");
		return content;
	} catch (error) {
		console.error(
			format(
				"Error reading file: %s",
				error instanceof Error ? error.message : "Unknown error",
			),
		);
		return null;
	}
};
