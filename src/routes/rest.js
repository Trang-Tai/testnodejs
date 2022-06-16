const express = require('express');
const router = express.Router();

const restController = require('../app/controllers/RestController');

router.get('/read', restController.read);
router.post('/create', restController.create);
router.put('/update', restController.update);
router.patch('/onlyNeedToUpdateOneProperty', restController.onlyNeedToUpdateOneProperty);
router.delete('/delete', restController.delete);

module.exports = router;