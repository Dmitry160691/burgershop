export type IngredientType = {
    _id: string;
    name: string;
    type: string;
    price: number;
    image: string;
    image_mobile?: string;
    image_large?: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    __v?: number;
  }