import path from "node:path";
import { parse, serialize } from "../utils/json";
import { Film } from "../types";

const jsonDbPath = path.join(__dirname, "/../data/films.json");
const defaultFilms: Film[] = []; // Films par défaut si le fichier JSON est manquant

/**
 * Récupère tous les films avec des options de filtrage (titre et durée minimale).
 * @param filters - Les filtres pour la recherche
 * @returns Une liste filtrée de films
 */
export const getAllFilms = (filters?: { title?: string; minimumDuration?: number }): Film[] => {
  const films = parse(jsonDbPath, defaultFilms);

  let filteredFilms = films;

  // Filtrer par titre
  if (filters?.title) {
    filteredFilms = filteredFilms.filter((film) =>
      film.title.toLowerCase().includes(filters.title?.toLowerCase() ?? "")
    );
  }

  // Filtrer par durée minimale
  if (filters?.minimumDuration !== undefined) {
    filteredFilms = filteredFilms.filter((film) => filters.minimumDuration !== undefined && film.duration >= filters.minimumDuration);
  }

  return filteredFilms;
};

/**
 * Supprime un film par son ID.
 * @param id - L'ID du film à supprimer
 * @returns Le film supprimé ou null s'il n'existe pas
 */
export const deleteFilmById = (id: number): Film | null => {
  const films = parse(jsonDbPath, defaultFilms);
  const index = films.findIndex((film) => film.id === id);
  if (index === -1) {
    return null;
  }

  const [deletedFilm] = films.splice(index, 1);
  serialize(jsonDbPath, films); // Met à jour le fichier JSON
  return deletedFilm;
};

/**
 * Met à jour un film par son ID.
 * @param id - L'ID du film à mettre à jour
 * @param updates - Les nouvelles données à appliquer
 * @returns Le film mis à jour ou null s'il n'existe pas
 */
export const updateFilmById = (id: number, updates: Partial<Film>): Film | null => {
  const films = parse(jsonDbPath, defaultFilms);
  const film = films.find((film) => film.id === id);
  if (!film) {
    return null;
  }

  // Appliquer les mises à jour
  if (updates.title !== undefined) {
    film.title = updates.title.trim();
  }
  if (updates.imageUrl !== undefined) {
    film.imageUrl = updates.imageUrl.trim();
  }
  if (updates.duration !== undefined) {
    film.duration = updates.duration;
  }
  if (updates.budget !== undefined) {
    film.budget = updates.budget;
  }

  serialize(jsonDbPath, films); // Met à jour le fichier JSON
  return film;
};

/**
 * Ajoute un nouveau film.
 * @param newFilm - Les données du nouveau film
 * @returns Le film ajouté
 */
export const addFilm = (newFilm: Omit<Film, "id">): Film => {
  const films = parse(jsonDbPath, defaultFilms);
  const nextId = films.reduce((maxId, film) => Math.max(maxId, film.id), 0) + 1;

  const filmToAdd: Film = { id: nextId, ...newFilm };
  films.push(filmToAdd);
  serialize(jsonDbPath, films); // Met à jour le fichier JSON

  return filmToAdd;
};

/**
 * Récupère un film par son ID.
 * @param id - L'ID du film à récupérer
 * @returns Le film correspondant ou null s'il n'existe pas
 */
export const getFilmById = (id: number): Film | null => {
  const films = parse(jsonDbPath, defaultFilms);
  return films.find((film) => film.id === id) || null;
};
