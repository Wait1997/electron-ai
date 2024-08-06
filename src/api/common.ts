import { webApi } from '@/server';

export function apiGet() {
  return webApi.get('/');
}
