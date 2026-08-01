export interface Career {
  _id: string;
  title: string;
  slug: string;
  description: string;
  industry: string;
  averageSalary: {
    min: number;
    max: number;
    currency: string;
  };
  requiredSkills: string[];
  growthOutlook: "declining" | "stable" | "growing" | "high-growth";
  icon?: string;
}

export interface CareersResponse {
  success: boolean;
  count: number;
  total: number;
  page: number;
  totalPages: number;
  careers: Career[];
}
