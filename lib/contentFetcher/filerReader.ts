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

type AdvancedFilter<T> = {
  [K in keyof T]?:
    | T[K]
    | { gte?: number; lte?: number }
    | { contains?: string };
};
type CacheEntry<T> = {
  data: T[];
  lastModified: number;
};

const contentCache = new Map<string, CacheEntry<any>>();

export function getAllContent<T = unknown>(folder: string): T[] {
  const dirPath = path.join(process.cwd(), "content", folder);

  if (!fs.existsSync(dirPath)) {
    throw new Error(`Content folder not found: ${dirPath}`);
  }

  const files = fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith(".json"));

  let latestMTime = 0;

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.mtimeMs > latestMTime) {
      latestMTime = stat.mtimeMs;
    }
  }

  const cached = contentCache.get(folder);

  // ✅ If cache exists AND nothing changed → return cached
  if (cached && cached.lastModified === latestMTime) {
    return cached.data as T[];
  }

  // 🔥 Re-read files only when modified
  const data = files.map((file) => {
    const filePath = path.join(dirPath, file);
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T;
  });

  contentCache.set(folder, {
    data,
    lastModified: latestMTime,
  });

  return data;
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
    filters?: AdvancedFilter<T>;
    pagination?: PaginationOptions;
  },
): PaginatedResult<T> {
  const { filters = {}, pagination = { page: 1, limit: 10 } } = options || {};
  const { page = 1, limit = 10 } = pagination;

  let items = getAllContent<T>(folder);

  if (filters && Object.keys(filters).length) {
    items = applyFilters(items, filters);
  }

  const total = items.length;
  const totalPages = Math.ceil(total / limit);

  const safePage = Math.max(1, Math.min(page, totalPages || 1));
  const start = (safePage - 1) * limit;
  const end = start + limit;

  const data = items.slice(start, end);

  return {
    data,
    meta: {
      total,
      page: safePage,
      limit,
      totalPages,
    },
  };
}

function applyFilters<T>(items: T[], filters: AdvancedFilter<T>): T[] {
  return items.filter((item) =>
    Object.entries(filters).every(([key, value]) => {
      const field = item[key as keyof T];

      if (typeof value === "object" && value !== null) {
        if ("gte" in value || "lte" in value) {
          if (typeof field !== "number") return false;
          if (
            "gte" in value &&
            typeof value.gte === "number" &&
            typeof field === "number" &&
            field < value.gte
          )
            return false;
          if (
            "lte" in value &&
            typeof value.lte === "number" &&
            typeof field === "number" &&
            field > value.lte
          )
            return false;
          return true;
        }

        if ("contains" in value) {
          if (typeof field !== "string" || typeof value.contains !== "string")
            return false;
          return field.toLowerCase().includes(value.contains.toLowerCase());
        }
      }

      return field === value;
    }),
  );
}
