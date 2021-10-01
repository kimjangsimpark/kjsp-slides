export interface ToolbarModel {
  title: string;
  children: TreeModel[];
}

export interface TreeModel {
  title: string;
  description?: string;
  onClick?: (event: MouseEvent) => void;
  children?: TreeModel[];
}