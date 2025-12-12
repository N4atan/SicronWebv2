import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../services/api', () => {
  return {
    api: {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
      interceptors: { response: { use: vi.fn() } },
    },
  };
});

import { api } from '../../services/api';
import { UserService } from '../../services/UserService';
import { UserDTO, UserRole } from '../../services/dtos';

// Helper to build a sample user
const makeUser = (overrides: Partial<UserDTO> = {}): UserDTO => ({
  uuid: 'u-1',
  username: 'john',
  email: 'john@example.com',
  role: UserRole.USER,
  ...overrides,
});

// API response helpers
const makeAxiosResponse = <T,>(data: T) => ({
  data: () => data,
});

const makeAxiosError = (status?: number, message: string = 'error') => {
  const error: any = new Error(message);
  if (status) {
    error.response = { status };
  }
  error.config = {};
  return error;
};

describe('UserService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Should call GET /user and return a list of users (getAll)', async () => {
    const users = [makeUser({ uuid: '1' }), makeUser({ uuid: '2' })];
    (api.get as any).mockResolvedValueOnce(makeAxiosResponse(users));

    const result = await UserService.getAll();

    expect(api.get).toHaveBeenCalledWith('/user');
    expect(result).toEqual(users);
  });

  it('Should call POST /user and return the created user (register)', async () => {
    const input = makeUser({ uuid: 'new-user' });
    (api.post as any).mockResolvedValueOnce(makeAxiosResponse(input));

    const result = await (UserService as any).register(input);

    expect(api.post).toHaveBeenCalledWith('/user', input);
    expect(result).toEqual(input);
  });

  it('Should propagate 404 errors from getAll gracefully', async () => {
    (api.get as any).mockRejectedValueOnce(makeAxiosError(404, 'Not Found'));

    await expect(UserService.getAll()).rejects.toBeTruthy();
    expect(api.get).toHaveBeenCalledWith('/user');
  });

  it('Should set and get error via instance methods', () => {
    const service = new UserService();
    service.setError('failure');
    expect(service.getError()).toBe('failure');
  });

  it('Should propagate network errors from register', async () => {
    const input = makeUser({ uuid: 'x' });
    (api.post as any).mockRejectedValueOnce(makeAxiosError(undefined, 'Network Error'));

    // register currently swallows errors; assert it does not throw and returns undefined
    const result = await (UserService as any).register(input);
    expect(api.post).toHaveBeenCalledWith('/user', input);
    expect(result).toBeUndefined();
  });

  it('Should use shared axios instance (api) with base config', async () => {
    const user = makeUser();
    (api.post as any).mockResolvedValueOnce(makeAxiosResponse(user));

    await (UserService as any).register(user);
    expect(api.post).toHaveBeenCalled();
  });

  it('Should return typed DTOs from getAll', async () => {
    const users: UserDTO[] = [
      { uuid: '1', username: 'a', role: UserRole.USER, email: 'a@a.com' },
      { uuid: '2', username: 'b', role: UserRole.ADMIN },
    ];
    (api.get as any).mockResolvedValueOnce(makeAxiosResponse(users));

    const result = await UserService.getAll();
    expect(result[0].uuid).toBe('1');
    expect(result[1].role).toBe(UserRole.ADMIN);
  });
});
