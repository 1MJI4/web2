import { Router } from "express";
import {
  getAllFilms,
  deleteFilmById,
  updateFilmById,
} from "../services/films";
import { Film } from "../types";

const router = Router();

router.get("/", (req, res) => {
  const title = req.query["titre"] ? String(req.query["titre"]) : undefined;
  const minimumDuration = req.query["minimum-duration"]
    ? Number(req.query["minimum-duration"])
    : undefined;

  if (minimumDuration !== undefined && (isNaN(minimumDuration) || minimumDuration <= 0)) {
    return res.status(400).json("Minimum duration must be a positive number");
  }

  const films = getAllFilms({ title, minimumDuration });
  return res.json(films);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json("Invalid ID");
  }

  const deletedFilm = deleteFilmById(id);
  if (!deletedFilm) {
    return res.status(404).json("Film not found");
  }

  return res.json(deletedFilm);
});

router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json("Invalid ID");
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
    return res.status(400).json("Invalid input");
  }

  const updatedFilm = updateFilmById(id, body);
  if (!updatedFilm) {
    return res.status(404).json("Film not found");
  }

  return res.json(updatedFilm);
});

export default router;
