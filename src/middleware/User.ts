import apiClient from "./Base";

export const showMe = async (): Promise<any> => {
  const response = await apiClient.get<any>('/api/v1/user/show-me');
  return response.data;
};

export const showAllUser = async (payload: any): Promise<any> => {
  const response = await apiClient.get<any>(`/api/v1/user/show-all?${payload}`);
  return response.data;
};
export const updateProfile = async (id: string, payload: any): Promise<any> => {
  const response = await apiClient.put<any>(`/api/v1/user/update/${id}`, payload);
  return response.data;
};


