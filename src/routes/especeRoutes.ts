import express from 'express';
import EspeceController from '../controllers/especeController';

const router = express.Router();

router.post('/', EspeceController.createEspece);
router.get('/', EspeceController.readAllEspece);
router.get('/:especeId', EspeceController.readEspece);
router.put('/:especeId', EspeceController.updateEspece);
router.delete('/:especeId', EspeceController.deleteEspece);

export default router;
