
export type Category = 'Tops' | 'Bottoms' | 'Dresses' | 'Outerwear' | 'Shoes' | 'Accessories';
export type Style = 'Casual' | 'Formal' | 'Party' | 'Business' | 'Sporty';

export interface WardrobeItem {
  id: string;
  imageUrl: string;
  type: string;
  color: string;
  fabric: string;
  category: Category;
  style: Style;
  createdAt: number;
}

export interface OutfitRecommendation {
  id: string;
  title: string;
  occasion: string;
  itemsUsed: string[]; // IDs of items
  suggestedAccessories: string[];
  suggestedFootwear: string;
  suggestedLayering?: string;
  rationale: string;
  shoppingSuggestions: {
    item: string;
    reason: string;
  }[];
}

export interface MarketplaceItem {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  category: Category;
}

export interface User {
  name: string;
  email: string;
}
