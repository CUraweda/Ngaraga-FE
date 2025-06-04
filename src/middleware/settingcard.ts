import apiClient from "./Base";

export const getAllHomePage = async (payload: string): Promise<any> => {
  const response = await apiClient.get<any>(
    `/api/v1/trending-card/show-all?${payload}`
  );
  return response.data;
};
export const createHomePage = async (data: any): Promise<any> => {
  const response = await apiClient.post<any>(`/api/v1/trending-card/create`, data);
  return response.data;
};
export const updateHomePage = async (id: string, data: any): Promise<any> => {
  const response = await apiClient.put<any>(
    `/api/v1/trending-card/update/${id}`,
    data
  );
  return response.data;
};
export const deleteHomePage = async (id: string): Promise<any> => {
  const response = await apiClient.delete<any>(`/api/v1/trending-card/delete/${id}`);
  return response.data;
};
