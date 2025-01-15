export interface OccupationData {
  description: string;
  onetTitle: string;
  onetSocCode: string;
}

export interface OccupationTitleData {
  onetSocCode: string;
  title: string;
}

export interface RoleData {
  role: string;
  critical: boolean;
  domain_areas: string[];
}
