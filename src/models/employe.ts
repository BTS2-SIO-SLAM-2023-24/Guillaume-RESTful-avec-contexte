import mongoose, { Document, Schema, Types } from "mongoose";

export interface IEmploye extends Document {
    nom: string;
    prenom: string;
    dateNaissance: Date;
    calculerAge(): number;
    affecterAnimal(animalId: Types.ObjectId): void;
    retirerAnimal(animalId: Types.ObjectId): void;
    LesAnimaux: Types.ObjectId[];
}

const EmployeSchema: Schema = new Schema(
    {
        nom: { type: String, required: true },
        prenom: { type: String, required: true },
        dateNaissance: { type: Date, required: true },
        LesAnimaux: [{ type: Schema.Types.ObjectId, ref: 'Animal' }] // Champ pour stocker les ObjectIds des animaux associés à l'employé
    },
    {
        timestamps: true,
        versionKey: false
    }
);

EmployeSchema.methods.calculerAge = function(): number {
    const aujourdHui = new Date();
    const dateNaissance = this.dateNaissance;
    const differenceAnnees = aujourdHui.getFullYear() - dateNaissance.getFullYear();
    const anniversairePasse = aujourdHui.getMonth() > dateNaissance.getMonth() ||
        (aujourdHui.getMonth() === dateNaissance.getMonth() && aujourdHui.getDate() >= dateNaissance.getDate());

    return anniversairePasse ? differenceAnnees : differenceAnnees - 1;
};

EmployeSchema.methods.affecterAnimal = function(animalId: Types.ObjectId): void {
    this.LesAnimaux.push(animalId);
};

EmployeSchema.methods.retirerAnimal = function(animalId: Types.ObjectId): void {
    this.LesAnimaux.pull(animalId);
};

export default mongoose.model<IEmploye>('Employe', EmployeSchema);
