import { DynamicObject } from ".";

export interface Story {
  args?: any;
  components?: DynamicObject<any>;
  setup?: () => { args?: any };
  template?: string;
}

export interface BuildTemplate extends Story {
  (args: DynamicObject<any>): Story;
}
