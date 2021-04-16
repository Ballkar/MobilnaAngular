export interface SidemenuElement {
  id: string;
  icon: string;
  title: string;
  navigateTo: string[];
  active: boolean;
  child?: SidemenuElement[];
}
