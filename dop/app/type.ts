// types.ts
export interface MenuItem {
    label: string;
    href?: string;
    menuName?: string;
    submenuItems?: MenuItem[];
  }
  