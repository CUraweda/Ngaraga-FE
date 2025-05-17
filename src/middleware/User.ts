import apiClient from "./Base";

export const showMe = async (): Promise<any> => {
  const response = await apiClient.get<any>('/api/v1/user/show-me');
  return response.data;
};