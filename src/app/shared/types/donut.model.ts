export interface Donut {
  id: number;
  created_at: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  isFlavoured: null;
  isAddedToCart: boolean;
  isAddedToWishlist: boolean;
}

export interface DonutWithDetails {
  id?: number;
  created_at?: string;
  name: string;
  description: string;
  price?: number;
  quantity?: number;
  image: string;
  isFlavoured?: null;
  isAddedToCart?: boolean;
  isAddedToWishlist?: boolean;
}
