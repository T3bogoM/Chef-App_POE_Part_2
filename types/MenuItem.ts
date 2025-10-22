export interface MenuItem {
  id: string;
  dishName: string;
  description: string;
  course: string;
  price: number;
}

export type Course = 'starter' | 'main' | 'dessert';

export const COURSES: Course[] = ['starter', 'main', 'dessert'];
