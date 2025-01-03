import { Router } from "express";
import { Film } from "../types"; // Assure-toi que le type Film est bien défini
import filmsData from "../data/films.json"; // Import the JSON file
import path from "node:path";
import { parse, serialize } from "../utils/json";
const jsonDbPath = path.join(__dirname, "/../data/films.json");
const router = Router();

const Films_liste: Film[] = filmsData as Film[]; // Ensure the imported JSON data is typed correctly

/* Read all the films from the menu
   GET /films
*/
router.get("/", (req, res) => {
  const films = parse(jsonDbPath, Films_liste);
  const minduration = req.query["minimum-duration"] ? Number(req.query["minimum-duration"]) : undefined;
  const nom_film = req.query["titre"] ? String(req.query["titre"]) : undefined;

  if (minduration !== undefined && (isNaN(minduration) || minduration <= 0)) {
    return res.json("duree impossible");
  }

  let filtrefilm = Films_liste;

  if (nom_film) {
    filtrefilm = filtrefilm.filter((film) => film.title.toLowerCase().includes(nom_film.toLowerCase()));
  }

  if (minduration) {
    filtrefilm = filtrefilm.filter((film) => film.duration >= minduration);
  }

  return res.json(filtrefilm); // Renvoie simplement la liste des films filtrés
});

router.delete("/:id", (req, res) => {
  const films = parse(jsonDbPath, Films_liste);
  const id = Number(req.params.id);
  const index = Films_liste.findIndex((film) => film.id === id);
  if (index === -1) {
    return res.sendStatus(404);
  }
  const deletedElements = Films_liste.splice(index, 1); // splice() returns an array of the deleted elements
  return res.json(deletedElements[0]);
});

router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const films = parse(jsonDbPath, Films_liste);
  const film = Films_liste.find((film) => film.id === id);
  if (!film) {
    return res.sendStatus(404);
  }

  const body: Partial<Film> = req.body;

  if (
    !body ||
    typeof body !== "object" ||
    ("title" in body && (typeof body.title !== "string" || !body.title.trim())) ||
    ("imageUrl" in body && (typeof body.imageUrl !== "string" || !body.imageUrl.trim())) ||
    ("duration" in body && (typeof body.duration !== "number" || body.duration <= 0)) ||
    ("budget" in body && (typeof body.budget !== "number" || body.budget <= 0))
  ) {
    return res.sendStatus(400);
  }

  if (body.title) {
    film.title = body.title;
  }
  if (body.imageUrl) {
    film.imageUrl = body.imageUrl;
  }
  if (body.duration) {
    film.duration = body.duration;
  }
  if (body.budget) {
    film.budget = body.budget;
  }

  return res.json(film);
});

export default router;