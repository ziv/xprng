export type Prop = {
  id: string;
  name: string;
  type: "string" | "text" | "number" | "boolean" | "list";
  description: string;
  value: any;
  required?: boolean;
  options?: { label: string; value: any }[];
};

export type DocDescriptor = {
  id: string;
  name: string;
  description: string;
  overview?: string; // URL
  props: Prop[];
};
