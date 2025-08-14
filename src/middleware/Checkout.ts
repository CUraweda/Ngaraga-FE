import apiClient from "./Base";

export const createCheckoutNewUser = async (payload: string): Promise<any> => {
  const response = await apiClient.get<any>(
    `/api/v1/transaction/create${payload}`
  );
  return response.data;
};

export const getDataCheckout = async (id: any): Promise<any> => {
  const response = await apiClient.get<any>(
    `/api/v1/cart-item/show-all?where=userId:${id}`
  );
  return response.data;
};
