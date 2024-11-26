import { Router } from "express";
// import path from "node:path";
import { Film } from "../types"; // Assure-toi que le type Film est bien défini

const router = Router();

// Chemin vers le fichier JSON si nécessaire, sinon tu peux l'ignorer
// const jsonDbPath = path.join(__dirname, "/../data/pizzas.json");

const Films_liste: Film[] = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    duration: 148, // en minutes
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    duration: 175,
  },
  {
    id: 3,
    title: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    duration: 136,
  },
  {
    id: 4,
    title: "Interstellar",
    director: "Christopher Nolan",
    duration: 169,
  },
  {
    id: 5,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    duration: 154,
  }
];

/* Read all the films from the menu
   GET /films
*/
router.get("/", (_req, res) => {
  return res.json(Films_liste); // Renvoie simplement la liste des films
});

export default router;
