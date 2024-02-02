import { api } from "@/utils/axios";

export const userList = async (token, page, filter) => {
  const response = await api.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      page,
      name: filter.name,
      with_deleted: filter.deleted,
      deleted_only: filter.only_deleted,
    },
  });
  return response.data;
};

export const userShow = async (token, id) => {
  const response = await api.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const userDelete = async (token, id) => {
  const response = await api.delete(`users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const userRestore = async (token, id) => {
  const response = await api.get(`users/restore/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
