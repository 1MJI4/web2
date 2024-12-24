export interface Film {
  id: number;
  title: string;
  director: string;
  duration: number;
  budget: number;
  description: string;
  imageUrl: string;
}

export interface Text {
  id: string; // UUID unique
  content: string; // Texte à dactylographier
  level: "easy" | "medium" | "hard"; // Niveau de difficulté
}

export interface NewText {
  content: string; // Nouveau texte
  level: "easy" | "medium" | "hard"; // Niveau de difficulté
}
