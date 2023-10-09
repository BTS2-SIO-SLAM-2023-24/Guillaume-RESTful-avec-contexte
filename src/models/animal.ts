import mongoose, { Document, Schema } from "mongoose";

export interface IAnimal {
    nom: string;
    age: number;
    race: string;

}

export interface IAnimalModel extends IAnimal, Document {}

const AnimalSchema: Schema = new Schema(
    {
        nom: { type: String, required: true },
        age: { type: Number, required: true },
        race: { type: String, required: true },

    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model<IAnimalModel>("Animal", AnimalSchema);
