import apiClient from "./Base";

export const getAllCartItem = async (payload: string): Promise<any> => {
  const response = await apiClient.get<any>(
    `/api/v1/cart-item/show-all?${payload}`
  );
  return response.data;
};

export const getCartItemById = async (id: string): Promise<any> => {
  const response = await apiClient.get<any>(`/api/v1/cart-item/show-one/${id}`);
  return response.data;
};

export const getCountCartItem = async (): Promise<any> => {
  const response = await apiClient.get<any>(`/api/v1/cart-item/count`);
  return response.data;
};

export const addToCartItem = async (data: any): Promise<any> => {
  const response = await apiClient.post<any>(`/api/v1/cart-item/create`, data);
  return response.data;
};

export const updateCartItem = async (id: string, data: any): Promise<any> => {
  const response = await apiClient.put<any>(
    `/api/v1/cart-item/update/${id}`,
    data
  );
  return response.data;
};

export const deleteCartItem = async (id: string): Promise<any> => {
  const response = await apiClient.delete<any>(
    `/api/v1/cart-item/delete/${id}`
  );
  return response.data;
};


