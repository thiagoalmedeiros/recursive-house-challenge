export interface Card {
  id?: number;
  name: string;
  type: string;
  subtypes: string[];
  cost: number;
  power: number;
  health: number;
  set: Set;
  collectible: boolean;
  soulSummon: number;
  soulTrap: number;
  text: string;
  attributes: string[];
  keywords: string[];
  unique: boolean;
  imageUrl: string;
}


export interface Set {
  id: string;
  name: string;
  _self: string;
}
