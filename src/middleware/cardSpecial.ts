import apiClient from "./Base";

export const checkCardSpecial = async (id: string): Promise<any> => {
  const response = await apiClient.get<any>(
    `/api/v1/card-special-user/check/${id}`
  );
  return response.data;
};
export const getAllSpecialCards = async (): Promise<any> => {
  const response = await apiClient.get<any>(
    `/api/v1/card-special-user/`
  );
  return response.data;
};

export const claimCardSpecial = async (id: string): Promise<any> => {
  const response = await apiClient.post<any>(
    `/api/v1/card-special-user/claim/${id}`
  );
  return response.data;
};

