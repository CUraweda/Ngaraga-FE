import apiClient from "./Base";

export const getAll = async (payload: string): Promise<any> => {
  const response = await apiClient.get<any>(
    `/api/v1/card/show-all?${payload}`
  );
  return response.data;
};
export const getById = async (id: string): Promise<any> => {
  const response = await apiClient.get<any>(`/api/v1/card/show-one/${id}`);
  return response.data;
};
export const createCard = async (data: any): Promise<any> => {
  const response = await apiClient.post<any>(`/api/v1/card/create`, data);
  return response.data;
};
export const updateCard = async (id: string, data: any): Promise<any> => {
  const response = await apiClient.put<any>(
    `/api/v1/card/update/${id}`,
    data
  );
  return response.data;
};
export const addStock = async (id: string, data: any): Promise<any> => {
  const response = await apiClient.post<any>(
    `/api/v1/card/add-stock/${id}`,
    data
  );
  return response.data;
};

export const deleteCard = async (id: string): Promise<any> => {
  const response = await apiClient.delete<any>(`/api/v1/card/delete/${id}`);
  return response.data;
};
export const deleteRequiredCard = async (id: string): Promise<any> => {
  const response = await apiClient.delete<any>(`/api/v1/card/delete-required-card/${id}`);
  return response.data;
};

export const addCardToSpecial = async (id: string, data: any): Promise<any> => {
  const response = await apiClient.post<any>(`/api/v1/card/add-required-card/${id}`, data);
  return response.data;
};
