import { get } from "http";
import { fetcher } from "../utils";

export const listingService = {
  getListings: () => fetcher("/api/listing"),
  getListingByPage: (
    page: number,
    limit: number,
    filters?: Record<string, any>,
  ) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      ...serializeFilters(filters),
    });

    return fetcher(`/api/listing?${params.toString()}`);
  },
  getListingById: (id: string) => fetcher(`/api/listing/${id}`),
  getFeaturedListings: () => fetcher("/api/listing?featured=true"),
};
function serializeFilters(
  filters?: Record<string, any>,
): Record<string, string> {
  if (!filters) return {};

  const result: Record<string, string> = {};

  Object.entries(filters).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      result[key] = value.join(","); // send arrays as CSV
    } else if (value !== "all" && value !== "any" && value !== "") {
      result[key] = String(value);
    }
  });

  return result;
}
