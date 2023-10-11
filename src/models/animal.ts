import mongoose, { Document, Schema } from "mongoose";

export interface IAnimal extends Document {
    nom: string;
    espece: mongoose.Types.ObjectId; // Référence à l'ID de l'espèce
    employes: string[];
}

export interface IAnimalModel extends IAnimal, Document {}

const AnimalSchema: Schema = new Schema(
    {
        nom: { type: String, required: true },
        espece: { type: Schema.Types.ObjectId, ref: 'Espece', required: true }, // Référence à l'ID de l'espèce
        employes: [{ type: Schema.Types.ObjectId, ref: 'Employe' }]
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model<IAnimalModel>("Animal", AnimalSchema);
