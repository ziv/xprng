export type Prop = {
  id: string;
  name: string;
  type: 'string' | 'text' | 'number' | 'boolean';
  description: string;
  value: any;
  required?: boolean;
}

export type DocDescriptor = {
  id: string;
  name: string;
  description: string;
  overview?: string; // URL
  props: Prop[];
};
