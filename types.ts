export enum CategoryId {
  SHROUD = 'shroud', // 수의
  CASKET = 'casket', // 관
  VEHICLE = 'vehicle', // 운구차량
  FLOWER = 'flower', // 제단꽃
  HELPER = 'helper', // 도우미
  METHOD = 'method', // 장묘 방법 (화장/매장)
  MEAL = 'meal', // 식사
}

export interface Product {
  id: string;
  categoryId: CategoryId;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isPopular?: boolean;
  unit?: string;
  step?: number;
}

export interface CartItem extends Product {
  quantity: number;
  options?: {
    duration?: number;
  };
}

export interface Order {
  items: CartItem[];
  clientName: string;
  deceasedName: string;
  date: string;
}

export type CategoryMeta = {
  id: CategoryId;
  label: string;
  icon: string;
}