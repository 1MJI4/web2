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
    budget:190,
    description:"livre",
    imageUrl:"https://upload.wikimedia.org/wikipedia/en/4/44/Her2013Poster.jpg"
  },
  {
    id: 2,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    duration: 175,
    budget:190,
    description:"livre",
    imageUrl:"https://upload.wikimedia.org/wikipedia/en/4/44/Her2013Poster.jpg"
  },
  {
    id: 3,
    title: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    duration: 136,
    budget:190,
    description:"livre",
    imageUrl:"https://upload.wikimedia.org/wikipedia/en/4/44/Her2013Poster.jpg"
  },
  {
    id: 4,
    title: "Interstellar",
    director: "Christopher Nolan",
    duration: 169,
    budget:190,
    description:"livre",
    imageUrl:"https://upload.wikimedia.org/wikipedia/en/4/44/Her2013Poster.jpg"
  },
  {
    id: 5,
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    duration: 154,
    budget:190,
    description:"livre",
    imageUrl:"https://upload.wikimedia.org/wikipedia/en/4/44/Her2013Poster.jpg"
  }
];

/* Read all the films from the menu
   GET /films
*/
router.get("/", (_req, res) => {
  if (_req.query["minimum-duration"] === undefined) {
    return res.send(Films_liste);
  }
  const minduration = Number(_req.query["minimum-duration"]);//stock la valeur que l'on va donner dans la barre de recherche ex /films?minimum-duration=120 stock 120
  if(isNaN(minduration)||minduration<=0)
    res.json("duree impossible");
  const filtrefilm=Films_liste.filter((film)=>film.duration>=minduration);
  return res.json(filtrefilm); // Renvoie simplement la liste des films filtrer
});

export default router;
  