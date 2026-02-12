import { get } from "http";
import { fetcher } from "../utils";

export const listingService = {
  getListings: () => fetcher("/api/listing"),
  getListingByPage: (page: number, limit: number) =>
    fetcher(`/api/listing?page=${page}&limit=${limit}`),
  getListingById: (id: string) => fetcher(`/api/listing/${id}`),
  getFeaturedListings: () => fetcher("/api/listing?featured=true"),
};
