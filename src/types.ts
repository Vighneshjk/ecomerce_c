export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  suitable_face_shapes?: string;
  color: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type FaceShape = 'Oval' | 'Square' | 'Round' | 'Heart' | 'Diamond' | null;
