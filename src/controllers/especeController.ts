import { NextFunction, Request, Response } from 'express';
import Espece, { EspeceModel } from '../models/espece';

const createEspece = (req: Request, res: Response, next: NextFunction) => {
    const { nom } = req.body;

    const espece = new Espece({
        nom,
    });

    return espece
        .save()
        .then((espece: EspeceModel) => res.status(201).json({ espece }))
        .catch((error) => res.status(500).json({ error }));
};

const readEspece = (req: Request, res: Response, next: NextFunction) => {
    const especeId = req.params.especeId;

    return Espece.findById(especeId)
        .then((espece: EspeceModel | null) => (espece ? res.status(200).json({ espece }) : res.status(404).json({ message: 'Espèce non trouvée' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAllEspece = (req: Request, res: Response, next: NextFunction) => {
    return Espece.find()
        .then((especes: EspeceModel[]) => res.status(200).json({ especes }))
        .catch((error) => res.status(500).json({ error }));
};

const updateEspece = (req: Request, res: Response, next: NextFunction) => {
    const especeId = req.params.especeId;

    return Espece.findByIdAndUpdate(especeId, req.body, { new: true })
        .then((espece: EspeceModel | null) => (espece ? res.status(200).json({ espece }) : res.status(404).json({ message: 'Espèce non trouvée' })))
        .catch((error) => res.status(500).json({ error }));
};

const deleteEspece = (req: Request, res: Response, next: NextFunction) => {
    const especeId = req.params.especeId;

    return Espece.findByIdAndDelete(especeId)
        .then((espece: EspeceModel | null) => (espece ? res.status(200).json({ espece, message: 'Espèce supprimée' }) : res.status(404).json({ message: 'Espèce non trouvée' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createEspece, readEspece, readAllEspece, updateEspece, deleteEspece };
