import ky from 'ky';
import { handleError } from './errorHandler';

const instance = ky.create({
  // credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      (request) => {
        const authHeader = request.headers.get('Authorization');
        if (authHeader && !authHeader.startsWith('Bearer ')) {
          request.headers.set('Authorization', `Bearer ${authHeader}`);
        }
      },
    ],
  },
});

// apiClient.post('/endpoint', data, {'Authorization': 'Bearer token'});
// apiClient.get('/endpoint', {'Authorization': 'Bearer token'});
// apiClient.put('/endpoint', data, {'Authorization': 'Bearer token'});
// apiClient.delete('/endpoint', {'Authorization': 'Bearer token'});
export const apiClient = {
  post: <TReq = unknown, TRes = unknown>(
    endpoint: string,
    data: TReq,
    headers?: Record<string, string>,
  ): Promise<TRes> =>
    instance
      .post(endpoint, {
        json: data,
        headers,
      })
      .json<TRes>()
      .catch(async (error) => {
        const handledError = await handleError(error);
        throw handledError;
      }),

  get: <TRes = unknown>(
    endpoint: string,
    headers?: Record<string, string>,
  ): Promise<TRes> =>
    instance
      .get(endpoint, { headers })
      .json<TRes>()
      .catch(async (error) => {
        const handledError = await handleError(error);
        throw handledError;
      }),

  put: <TReq = unknown, TRes = unknown>(
    endpoint: string,
    data: TReq,
    headers?: Record<string, string>,
  ): Promise<TRes> =>
    instance
      .put(endpoint, {
        json: data,
        headers,
      })
      .json<TRes>()
      .catch(async (error) => {
        const handledError = await handleError(error);
        throw handledError;
      }),

  delete: <TRes = unknown>(
    endpoint: string,
    headers?: Record<string, string>,
  ): Promise<TRes> =>
    instance
      .delete(endpoint, { headers })
      .json<TRes>()
      .catch(async (error) => {
        const handledError = await handleError(error);
        throw handledError;
      }),
};
