const express = require('express')
const router = express.Router()

const MessageBadminton = require('../models/messageBadminton.model')
const { generateCrudMethods } = require('../services')
const messageBadmintonCrud = generateCrudMethods(MessageBadminton)
const { validateDbId, raiseRecord404Error } = require('../middlewares');


router.get('/', (req, res, next) => {
    messageBadmintonCrud.getAll()
        .then(data => res.send(data))
        .catch(err => next(err))
    })

router.get('/:id', validateDbId, (req, res, next) => {
        messageBadmintonCrud.getById(req.params.id)
        .then(data=>{ 
            if (data)
            res.send(data)
            else
            raiseRecord404Error(req, res)
        })
        .catch(err => next(err))
    })


router.post('/', (req,res, next) => {
    messageBadmintonCrud.create(req.body).then(data => res.status(201).json(data)).catch(err => next(err))
})

router.put('/:id', validateDbId, (req,res) => {
    messageBadmintonCrud.update(req.params.id, req.body)
    .then(data=>{ 
        if (data)
        res.send(data)
        else
        raiseRecord404Error(req, res)
    })
    .catch(err => next(err))
})
router.delete('/:id', validateDbId, (req,res ) => {
    messageBadmintonCrud.delete(req.params.id)
        .then(data => {
            if (data) res.send(data)
            else raiseRecord404Error(req, res)
        })
        .catch(err => next(err))
})

router.delete('/', async (req, res, next) => {
    try {
        // Wywołujemy funkcję deleteAll z modułu generującego metody CRUD
        const result = await messageBadmintonCrud.deleteAll();
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