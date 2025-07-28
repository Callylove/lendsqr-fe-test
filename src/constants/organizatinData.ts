export interface Organization {
  id: string;
  name: string;
  type: string;
}

export const organizations: Organization[] = [
  { id: "lendsqr", name: "Lendsqr", type: "Primary" },
  { id: "irorun", name: "Irorun", type: "Secondary" },
  { id: "lendstar", name: "Lendstar", type: "Partner" },
];
