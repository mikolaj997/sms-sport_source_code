const express = require('express')
const router = express.Router()

const MessageSquash = require('../models/messageSquash.model')
const { generateCrudMethods } = require('../services')
const messageSquashCrud = generateCrudMethods(MessageSquash)
const { validateDbId, raiseRecord404Error } = require('../middlewares');


router.get('/', (req, res, next) => {
    messageSquashCrud.getAll()
        .then(data => res.send(data))
        .catch(err => next(err))
    })

router.get('/:id', validateDbId, (req, res, next) => {
        messageSquashCrud.getById(req.params.id)
        .then(data=>{ 
            if (data)
            res.send(data)
            else
            raiseRecord404Error(req, res)
        })
        .catch(err => next(err))
    })


router.post('/', (req,res, next) => {
    messageSquashCrud.create(req.body).then(data => res.status(201).json(data)).catch(err => next(err))
})

router.put('/:id', validateDbId, (req,res) => {
    messageSquashCrud.update(req.params.id, req.body)
    .then(data=>{ 
        if (data)
        res.send(data)
        else
        raiseRecord404Error(req, res)
    })
    .catch(err => next(err))
})
router.delete('/:id', validateDbId, (req,res ) => {
    messageSquashCrud.delete(req.params.id)
        .then(data => {
            if (data) res.send(data)
            else raiseRecord404Error(req, res)
        })
        .catch(err => next(err))
})

router.delete('/', async (req, res, next) => {
    try {
        // Wywołujemy funkcję deleteAll z modułu generującego metody CRUD
        const result = await messageSquashCrud.deleteAll();
        // Jeśli rekordy zostały usunięte, zwracamy odpowiedź z sukcesem
        if (result) {
            res.status(200).json({ message: 'All records deleted successfully' });
        } else {
            // Jeśli nie znaleziono rekordów do usunięcia, zwracamy błąd 404
            res.status(404).json({ message: 'No records found to delete' });
        }
    } catch (error) {
        // Jeśli wystąpił błąd, przekazujemy go dalej do obsługi błędów
        next(error);
    }
});

    module.exports = router