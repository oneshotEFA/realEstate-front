import { get } from 'http';
import { fetcher } from '../utils';

export const agentService = {
  getagents: () => fetcher('/api/agent'),
  getagent: (id: string) => fetcher('/api/agent/id'),
  getCeo: () => fetcher('/api/agent?ceo=true'),
};
