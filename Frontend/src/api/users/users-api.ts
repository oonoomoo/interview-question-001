import { api } from "@api/api-client-config";
import type { UserListModel } from "./models/users-model";
import type { UsersCreateModel } from "./models/users-model";
import * as ENDPOINT from "@api/users/endpoint/endpoint";

export async function userList(): Promise<UserListModel.Response> {
  const response = await api.get<UserListModel.Response>(ENDPOINT.BASE_USERS);
  return response.data;
}

export async function createUser(
  payload: UsersCreateModel.Request,
): Promise<UsersCreateModel.Response> {
  const response = await api.post<UsersCreateModel.Response>(
    ENDPOINT.BASE_CREATE_USER,
    payload,
  );

  return response.data;
}
