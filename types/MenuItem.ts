/**
 * MenuItem Interface
 * Defines the structure of a menu item in the application
 */
export interface MenuItem {
  /** Unique identifier for the menu item */
  id: string;
  /** Name of the dish */
  dishName: string;
  /** Description of the dish */
  description: string;
  /** Course type: starter, main, or dessert */
  course: string;
  /** Price of the dish in dollars */
  price: number;
}

/**
 * Course Type
 * Defines the valid course types in the menu system
 */
export type Course = 'starter' | 'main' | 'dessert';

/**
 * Available Courses
 * Array of all available course types in the application
 */
export const COURSES: Course[] = ['starter', 'main', 'dessert'];
