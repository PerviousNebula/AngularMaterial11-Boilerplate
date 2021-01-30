export interface Menu {
    menuId: number;
    title: string;
    icon: string;
    url: string;
    menuItems: MenuItem[];
}

interface MenuItem {
    menuItemId: number;
    title: string;
    icon: string;
    url: string;
    menuId: number;
}
