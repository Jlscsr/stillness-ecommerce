import api from "@config/axios";

export const get = async <T>(url: string, params?: object): Promise<T> => {
  const response = await api.get<T>(url, { params });
  return response.data;
};

export const post = async <T>(
  url: string,
  data?: object,
  options?: object
): Promise<T> => {
  const response = await api.post<T>(url, data, options);
  return response.data;
};

export const put = async <T>(url: string, data?: object): Promise<T> => {
  const response = await api.put<T>(url, data);
  return response.data;
};

export const del = async <T>(url: string, params?: object): Promise<T> => {
  const response = await api.delete<T>(url, { params });
  return response.data;
};
