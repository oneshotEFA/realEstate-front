import { get } from "http";
import { fetcher } from "../utils";

export const agentService = {
  getagents: () => fetcher("/api/agent")

};