import jest from 'jest';
import * as jwt from 'jsonwebtoken';

import {
  generateAccessToken,
  generateRefreshToken,
  generateConfirmToken,
} from '../src/utils/tokenUtils.js';

jest.mock('jsonwebtoken');

describe('Token Generation', () => {
  const userId = 'testUser';
  const mockToken = 'mockToken123';

  beforeEach(() => {
    jwt.sign.mockReturnValue(mockToken);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('generateAccessToken should generate a token', () => {
    const token = generateAccessToken(userId);

    expect(token).toEqual(mockToken);
    expect(jwt.sign).toHaveBeenCalledWith({ id: userId }, expect.any(String), {
      expiresIn: expect.any(String),
    });
  });

  test('generateRefreshToken should generate a token', () => {
    const token = generateRefreshToken(userId);

    expect(token).toEqual(mockToken);
    expect(jwt.sign).toHaveBeenCalledWith({ id: userId }, expect.any(String), {
      expiresIn: expect.any(String),
    });
  });

  test('generateConfirmToken should generate a token', () => {
    const token = generateConfirmToken(userId);

    expect(token).toEqual(mockToken);
    expect(jwt.sign).toHaveBeenCalledWith({ id: userId }, expect.any(String), {
      expiresIn: expect.any(String),
    });
  });
});
