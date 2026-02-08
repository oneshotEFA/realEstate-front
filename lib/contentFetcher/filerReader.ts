import fs from "fs";
import path from "path";
interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
interface PaginationOptions {
  page?: number; // starts from 1
  limit?: number; // items per page
}
type FilterOptions<T> = Partial<{
  [K in keyof T]: T[K];
}>;

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

export function getFilteredContent<T>(
  folder: string,
  filters: FilterOptions<T>,
): T[] {
  return getAllContent<T>(folder).filter((item) =>
    Object.entries(filters).every(
      ([key, value]) => item[key as keyof T] === value,
    ),
  );
}

export function getPaginatedContent<T>(
  folder: string,
  options?: {
    filters?: FilterOptions<T>;
    pagination?: PaginationOptions;
  },
): PaginatedResult<T> {
  const { filters = {}, pagination = { page: 1, limit: 10 } } = options || {};

  const { page = 1, limit = 10 } = pagination;

  let items = getAllContent<T>(folder);

  if (Object.keys(filters).length > 0) {
    items = items.filter((item) =>
      Object.entries(filters).every(
        ([key, value]) => item[key as keyof T] === value,
      ),
    );
  }

  const total = items.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;

  const data = items.slice(start, end);

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages,
    },
  };
}
