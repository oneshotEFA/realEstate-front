import { fetcher } from "../utils";

export const listingService = {
  getListings: () => fetcher("/api/listing"),
};
