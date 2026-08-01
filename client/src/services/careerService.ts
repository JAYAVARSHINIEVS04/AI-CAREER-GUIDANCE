import axiosInstance from "../api/axiosInstance";
import type { CareersResponse } from "../types/career.types";

export const careerService = {
  getAll: async (search = "", page = 1): Promise<CareersResponse> => {
    const { data } = await axiosInstance.get<CareersResponse>("/careers", {
      params: { search, page },
    });
    return data;
  },

  getById: async (id: string) => {
    const { data } = await axiosInstance.get(`/careers/${id}`);
    return data;
  },
};
