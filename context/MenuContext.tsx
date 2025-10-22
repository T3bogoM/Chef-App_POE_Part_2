import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem } from '@/types/MenuItem';

interface MenuContextType {
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  removeMenuItem: (id: string) => void;
  getMenuItemsByCourse: (course: string) => MenuItem[];
  getTotalMenuItems: () => number;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

interface MenuProviderProps {
  children: ReactNode;
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      dishName: 'Truffle Arancini',
      description: 'Crispy risotto balls filled with truffle cream and parmesan, served with arugula',
      course: 'starter',
      price: 18.50,
    },
    {
      id: '2',
      dishName: 'Wagyu Beef Tenderloin',
      description: '8oz premium wagyu beef with roasted vegetables and red wine reduction',
      course: 'main',
      price: 65.00,
    },
    {
      id: '3',
      dishName: 'Chocolate Lava Cake',
      description: 'Warm chocolate cake with molten center, vanilla ice cream and berries',
      course: 'dessert',
      price: 14.00,
    },
    {
      id: '4',
      dishName: 'Seared Scallops',
      description: 'Pan-seared diver scallops with cauliflower puree and pancetta crisp',
      course: 'starter',
      price: 22.00,
    },
    {
      id: '5',
      dishName: 'Pan-Seared Salmon',
      description: 'Atlantic salmon with quinoa pilaf, roasted asparagus and lemon butter sauce',
      course: 'main',
      price: 28.50,
    },
  ]);

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: Date.now().toString(),
    };
    setMenuItems(prev => [...prev, newItem]);
  };

  const removeMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const getMenuItemsByCourse = (course: string) => {
    return menuItems.filter(item => item.course === course);
  };

  const getTotalMenuItems = () => {
    return menuItems.length;
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        addMenuItem,
        removeMenuItem,
        getMenuItemsByCourse,
        getTotalMenuItems,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
