import apiClient from "./Base";

export const createAddress = async (data: any): Promise<any> => {
  await apiClient.post(`/api/v1/address/create`, data);
};

export const updateAddress = async (data: any, id: any): Promise<any> => {
  await apiClient.put(`/api/v1/address/update/${id}`, data);
};

export const deleteAddress = async (id: any): Promise<any> => {
  await apiClient.post(`/api/v1/address/delete/${id}`);
};

export const getProvinces = async (): Promise<any> => {
  try {
    const response = await fetch(
      "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
    );
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch provinces:", error);
    return [];
  }
};

export const getRegencies = async (provinceId: string): Promise<any> => {
  try {
    const response = await fetch(
      `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`
    );
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch regencies:", error);
    return [];
  }
};

export const getDistricts = async (regencyId: string): Promise<any> => {
  try {
    const response = await fetch(
      `      https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regencyId}.json
`
    );
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch districts:", error);
    return [];
  }
};

export const getVillages = async (districtId: string): Promise<any> => {
  try {
    const response = await fetch(
      `      https://www.emsifa.com/api-wilayah-indonesia/api/villages/${districtId}.json
`
    );
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch villages:", error);
    return [];
  }
};
