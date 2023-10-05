import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Animal from "../models/animal";

const createAnimal = (req: Request, res: Response, next: NextFunction) => {
    const { nom, age, race } = req.body;

    const animal = new Animal({
        _id: new mongoose.Types.ObjectId(),
        nom,
        age,
        race,
    });

    return animal
        .save()
        .then((animal) => res.status(201).json({ animal }))
        .catch((error) => res.status(500).json({ error }));
};

const readAnimal = (req: Request, res: Response, next: NextFunction) => {
    const animalId = req.params.animalId;

    return Animal.findById(animalId)
        .then((animal) => (animal ? res.status(200).json({ animal }) : res.status(404).json({ message: "Animal non trouvé" })))
        .catch((error) => res.status(500).json({ error }));
};

const readAllAnimal = (req: Request, res: Response, next: NextFunction) => {
    return Animal.find()
        .then((animals) => res.status(200).json({ animals }))
        .catch((error) => res.status(500).json({ error }));
};

const updateAnimal = (req: Request, res: Response, next: NextFunction) => {
    const animalId = req.params.animalId;

    return Animal.findById(animalId)
        .then((animal) => {
            if (animal) {
                animal.set(req.body);

                return animal
                    .save()
                    .then((animal) => res.status(201).json({ animal }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: "Animal non trouvé" });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteAnimal = (req: Request, res: Response, next: NextFunction) => {
    const animalId = req.params.animalId;

    return Animal.findByIdAndDelete(animalId)
        .then((animal) => (animal ? res.status(201).json({ animal, message: "Animal supprimé" }) : res.status(404).json({ message: "Animal non trouvé" })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createAnimal, readAnimal, readAllAnimal, updateAnimal, deleteAnimal };
