import { Router } from "express";
import { Film } from "../types"; // Assure-toi que le type Film est bien défini
import filmsData from "../data/films.json"; // Import the JSON file

const router = Router();

console.log(filmsData); // Log the imported JSON data to verify its content

const Films_liste: Film[] = filmsData as Film[]; // Ensure the imported JSON data is typed correctly

/* Read all the films from the menu
   GET /films
*/
router.get("/", (req, res) => {
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

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const filmIndex = Films_liste.findIndex((film) => film.id === id);
  if (filmIndex === -1) {
    return res.sendStatus(404);
  }

  const body: Film = req.body;

  if (
    !body ||
    typeof body !== "object" ||
    typeof body.title !== "string" ||
    !body.title.trim() ||
    typeof body.imageUrl !== "string" ||
    !body.imageUrl.trim() ||
    typeof body.duration !== "number" ||
    body.duration <= 0 ||
    typeof body.budget !== "number" ||
    body.budget <= 0
  ) {
    return res.sendStatus(400);
  }

  Films_liste[filmIndex] = { ...Films_liste[filmIndex], ...body };

  return res.json(Films_liste[filmIndex]);
});

export default router;