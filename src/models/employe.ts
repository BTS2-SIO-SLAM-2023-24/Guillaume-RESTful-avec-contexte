import mongoose, { Document,Schema} from "mongoose";
// Modèle pour l'employé
export interface IEmploye {
    nom: string;
    prenom: string;
    dateNaissance: Date;
    calculerAge():number; //méthode calculer l'âge
}
export interface IEmployeModel extends IEmploye, Document {}
// Schéma pour l'employé
const EmployeSchema: Schema = new Schema(
    {
        nom: { type: String, required: true },
        prenom: { type: String, required: true },
        dateNaissance: { type: Date, required: true},
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








export default mongoose.model<IEmployeModel>('Employe', EmployeSchema);
