
import { Router } from "express";
import { Drink } from "../types"; // Assure-toi que le type Drink est bien défini

const router = Router();

router.post("/drinks", (req, res) => {
  const { title, image, volume, price } = req.body as Drink;

  if (!title || !image || !volume || !price) {
    return res.sendStatus(400);
  }

  const newDrink: Drink = { title, image, volume, price };
  // Ajoute la nouvelle boisson à la liste des boissons
  // ...

  return res.status(201).json(newDrink);
});

export default router;
import { Router } from "express";
import { Drink } from "../types"; // Assure-toi que le type Drink est bien défini

const router = Router();

router.patch("/drinks/:id", (req, res) => {
  const body: Partial<Drink> = req.body;

  if (
    ("title" in body && typeof body.title !== "string") ||
    ("image" in body && typeof body.image !== "string") ||
    ("volume" in body && typeof body.volume !== "number") ||
    ("price" in body && typeof body.price !== "number")
  ) {
    return res.sendStatus(400);
  }

  // Met à jour la boisson avec les nouvelles valeurs
  // ...

  return res.status(200).json(body);
});

export default router;