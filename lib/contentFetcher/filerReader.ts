import fs from "fs";
import path from "path";

/**
 * Generic JSON content loader
 * @param folder relative folder inside /content
 */
export function getAllContent<T = any>(folder: string): T[] {
  const dirPath = path.join(process.cwd(), "content", folder);

  if (!fs.existsSync(dirPath)) {
    throw new Error(`Content folder not found: ${dirPath}`);
  }

  const files = fs.readdirSync(dirPath);

  return files
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const filePath = path.join(dirPath, file);
      const raw = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(raw) as T;
    });
}

/**
 * Reusable featured filter
 */
export function getFeaturedContent<T extends { featured?: boolean }>(
  folder: string,
): T[] {
  return getAllContent<T>(folder).filter((item) => item.featured);
}
