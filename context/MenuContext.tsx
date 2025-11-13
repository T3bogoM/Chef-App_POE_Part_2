/**
 * MenuContext
 * Provides global state management for menu items
 * Handles CRUD operations for menu items and provides utility functions
 */
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem } from '@/types/MenuItem';

interface MenuContextType {
  menuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  removeMenuItem: (id: string) => void;
  getMenuItemsByCourse: (course: string) => MenuItem[];
  getTotalMenuItems: () => number;
  getAveragePrice: () => number;
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

/**
 * MenuProvider Component
 * Manages the menu items state and provides methods to manipulate it
 * Initializes with default menu items
 */
export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  // State to store all menu items - South African cuisine
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    // Starters (8)
    {
      id: '1',
      dishName: 'Biltong and Droëwors Platter',
      description: 'Traditional air-dried beef biltong and spiced dried sausage, served with pickled vegetables and chutney',
      course: 'starter',
      price: 85.00,
    },
    {
      id: '2',
      dishName: 'Samoosas',
      description: 'Crispy triangular pastries filled with spiced mince or vegetables, served with tamarind chutney',
      course: 'starter',
      price: 65.00,
    },
    {
      id: '3',
      dishName: 'Peri-Peri Chicken Livers',
      description: 'Pan-fried chicken livers in a spicy peri-peri sauce, served with toasted bread',
      course: 'starter',
      price: 78.00,
    },
    {
      id: '4',
      dishName: 'Vetkoek Bites with Mince',
      description: 'Mini fried vetkoek filled with savoury curried mince and chutney',
      course: 'starter',
      price: 72.00,
    },
    {
      id: '5',
      dishName: 'Pap and Chakalaka Bites',
      description: 'Crispy pap squares topped with tangy chakalaka relish',
      course: 'starter',
      price: 58.00,
    },
    {
      id: '6',
      dishName: 'Bobotie Spring Rolls',
      description: 'Spring rolls filled with Cape Malay bobotie mince, apricot and almond dip',
      course: 'starter',
      price: 74.00,
    },
    {
      id: '7',
      dishName: 'Curried Butternut Soup',
      description: 'Silky butternut soup with mild Cape Malay spices and cream',
      course: 'starter',
      price: 62.00,
    },
    {
      id: '8',
      dishName: 'Corn Fritters with Amasi',
      description: 'Golden sweetcorn fritters served with herbed amasi dip',
      course: 'starter',
      price: 59.00,
    },

    // Mains (8)
    {
      id: '9',
      dishName: 'Braai Platter',
      description: 'Mixed grill with boerewors, lamb chops, and sosaties, served with pap and chakalaka',
      course: 'main',
      price: 195.00,
    },
    {
      id: '10',
      dishName: 'Bunny Chow',
      description: 'Hollowed-out bread loaf filled with spicy curry (chicken or mutton), a Durban specialty',
      course: 'main',
      price: 125.00,
    },
    {
      id: '11',
      dishName: 'Bobotie',
      description: 'Spiced minced beef baked with a savoury egg custard, served with yellow rice and sambals',
      course: 'main',
      price: 139.00,
    },
    {
      id: '12',
      dishName: 'Cape Malay Chicken Curry',
      description: 'Fragrant, mildly spiced curry with apricot notes, served with roti',
      course: 'main',
      price: 149.00,
    },
    {
      id: '13',
      dishName: 'Oxtail Potjie',
      description: 'Slow-cooked oxtail stew with red wine and root vegetables',
      course: 'main',
      price: 209.00,
    },
    {
      id: '14',
      dishName: 'Grilled Kingklip',
      description: 'Lemon-butter kingklip fillet with roasted baby potatoes and greens',
      course: 'main',
      price: 189.00,
    },
    {
      id: '15',
      dishName: 'Lamb Sosaties',
      description: 'Cape Malay-style skewered lamb with apricot glaze, served with rice',
      course: 'main',
      price: 179.00,
    },
    {
      id: '16',
      dishName: 'Pap and Wors',
      description: 'Grilled boerewors with creamy pap and spicy chakalaka',
      course: 'main',
      price: 129.00,
    },

    // Desserts (8)
    {
      id: '17',
      dishName: 'Malva Pudding',
      description: 'Traditional South African sweet sponge pudding served warm with vanilla custard and caramel sauce',
      course: 'dessert',
      price: 75.00,
    },
    {
      id: '18',
      dishName: 'Milk Tart',
      description: 'Classic cinnamon-dusted custard tart with buttery pastry',
      course: 'dessert',
      price: 58.00,
    },
    {
      id: '19',
      dishName: 'Koeksisters',
      description: 'Twisted braided dough, deep-fried and soaked in sticky syrup',
      course: 'dessert',
      price: 46.00,
    },
    {
      id: '20',
      dishName: 'Peppermint Crisp Tart',
      description: 'Layers of Tennis biscuits, caramel and peppermint crisp cream',
      course: 'dessert',
      price: 64.00,
    },
    {
      id: '21',
      dishName: 'Amarula Cheesecake',
      description: 'Creamy baked cheesecake infused with Amarula liqueur',
      course: 'dessert',
      price: 82.00,
    },
    {
      id: '22',
      dishName: 'Hertzoggie',
      description: 'Jam-filled tartlets topped with coconut meringue',
      course: 'dessert',
      price: 44.00,
    },
    {
      id: '23',
      dishName: 'Cape Brandy Pudding',
      description: 'Rich date pudding soaked in brandy syrup, served with cream',
      course: 'dessert',
      price: 78.00,
    },
    {
      id: '24',
      dishName: 'Chocolate Lava Cake',
      description: 'Warm chocolate fondant with a molten centre and vanilla ice cream',
      course: 'dessert',
      price: 79.00,
    },
  ]);

  /**
   * Adds a new menu item to the array
   * @param item - Menu item data without an ID (ID is auto-generated)
   */
  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: Date.now().toString(), // Generate unique ID using timestamp
    };
    setMenuItems(prev => [...prev, newItem]);
  };

  /**
   * Removes a menu item from the array by ID
   * @param id - The unique identifier of the item to remove
   */
  const removeMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  /**
   * Filters menu items by course type
   * @param course - The course type to filter by (starter, main, dessert)
   * @returns Array of menu items matching the course
   */
  const getMenuItemsByCourse = (course: string) => {
    return menuItems.filter(item => item.course === course);
  };

  /**
   * Gets the total count of menu items
   * @returns The number of menu items
   */
  const getTotalMenuItems = () => {
    return menuItems.length;
  };

  /**
   * Calculates the average price of all menu items
   * @returns The average price, or 0 if there are no items
   */
  const getAveragePrice = () => {
    if (menuItems.length === 0) return 0;
    const totalPrice = menuItems.reduce((sum, item) => sum + item.price, 0);
    return totalPrice / menuItems.length;
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        addMenuItem,
        removeMenuItem,
        getMenuItemsByCourse,
        getTotalMenuItems,
        getAveragePrice,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
