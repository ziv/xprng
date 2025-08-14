export type Prop = {
  id: string;
  name: string;
  type: 'string' | 'text' | 'number' | 'boolean';
  description: string;
  value?: any;
  defaultValue?: string;
  required?: boolean;
}

export type DocDescriptor<PropKeys extends string> = {
  id: string;
  name: string;
  description: string;
  overview: string; // URL
  props: Record<PropKeys, Prop>;
};
