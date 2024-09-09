const express = require("express");
const router = express.Router();

const User = require("../models/user.model");
const { generateCrudMethods } = require("../services");
const userCrud = generateCrudMethods(User);
const { validateDbId, raiseRecord404Error } = require("../middlewares");

router.get("/", (req, res, next) => {
  userCrud
    .getAll()
    .then((data) => res.send(data))
    .catch((err) => next(err));
});

router.get("/:username", validateDbId, (req, res, next) => {
  userCrud
    .getById(req.params.id)
    .then((data) => {
      if (data) res.send(data);
      else raiseRecord404Error(req, res);
    })
    .catch((err) => next(err));
});

router.post("/", (req, res, next) => {
  userCrud
    .create(req.body)
    .then((data) => res.status(201).json(data))
    .catch((err) => next(err));
});

router.put("/:id", validateDbId, (req, res) => {
  userCrud
    .update(req.params.id, req.body)
    .then((data) => {
      if (data) res.send(data);
      else raiseRecord404Error(req, res);
    })
    .catch((err) => next(err));
});
router.put('/:username', (req, res, next) => {
  const username = req.params.username;
  messagePadelCrud.updateByUsername(username, req.body)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ error: 'Record not found' });
      }
    })
    .catch(err => next(err));
});

router.delete("/:id", validateDbId, (req, res) => {
  userCrud
    .delete(req.params.id)
    .then((data) => {
      if (data) res.send(data);
      else raiseRecord404Error(req, res);
    })
    .catch((err) => next(err));
});

router.delete("/", async (req, res, next) => {
  try {
    // Wywołujemy funkcję deleteAll z modułu generującego metody CRUD
    const result = await userCrud.deleteAll();
    // Jeśli rekordy zostały usunięte, zwracamy odpowiedź z sukcesem
    if (result) {
      res.status(200).json({ message: "All records deleted successfully" });
    } else {
      // Jeśli nie znaleziono rekordów do usunięcia, zwracamy błąd 404
      res.status(404).json({ message: "No records found to delete" });
    }
  } catch (error) {
    // Jeśli wystąpił błąd, przekazujemy go dalej do obsługi błędów
    next(error);
  }
});

module.exports = router;
