import { test, expect } from '@playwright/test';
import { apiClient } from '../utils/apiClient';
import { z } from 'zod';

// The user object to be posted
const user = {
  id: 10,
  username: "manuelam20",
  firstName: "Manuela",
  lastName: "Molina",
  email: "manuela@email.com",
  password: "12345",
  phone: "12345",
  userStatus: 1
};

// Zod schema to validate the user data
const UserSchema = z.object({
    id: z.number(),
    username: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string(),
    userStatus: z.number()
  });

test('User API E2E flow', async ({}) => {
    const client = await apiClient();

  // Step 1: POST a new user
  const postResponse = await client.post(`/api/v3/user`, {
    data: user
  });
  expect(postResponse.status()).toBe(200); // Ensure the user was created successfully

  // Step 2: Log in the user with GET /user/login
  const loginResponse = await client.get(`/api/v3/user/login`, {
    params: { username: user.username, password: user.password }
  });
  expect(loginResponse.status()).toBe(200); // Ensure login was successful

  // Step 3: Log out the user with GET /user/logout
  const logoutResponse = await client.get(`/api/v3/user/logout`);
  expect(logoutResponse.status()).toBe(200); // Ensure logout was successful

  // Step 4: Get the user by username and validate the schema
  const getUserResponse = await client.get(`/api/v3/user/${user.username}`);
  expect(getUserResponse.status()).toBe(200); // Ensure user exists

  const userData = await getUserResponse.json();

  // Validate the user data against the Zod schema
  UserSchema.parse(userData); // This will throw an error if the schema doesn't match

  // Step 5: PUT to update the user
  const updatedUser = { ...user, firstName: 'John Updated', lastName: 'James Updated' };
  const putResponse = await client.put(`/api/v3/user/${user.username}`, {
    data: updatedUser
  });
  expect(putResponse.status()).toBe(200); // Ensure user was updated successfully

  // Step 6: DELETE the user
  const deleteResponse = await client.delete(`/api/v3/user/${user.username}`);
  expect(deleteResponse.status()).toBe(200); // Ensure user was deleted successfully

  // Step 7: Verify user is deleted
  const verifyDeletedUserResponse = await client.get(`api/v3/user/${user.username}`);
  expect(verifyDeletedUserResponse.status()).toBe(404); // Ensure user no longer exists, should return 404
});
