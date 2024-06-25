import mongoose, { Schema, Document } from 'mongoose';

interface IArticle {
  produitId: mongoose.Schema.Types.ObjectId;
  quantite: number;
}

interface ICommande extends Document {
  clientId: mongoose.Schema.Types.ObjectId;
  articles: IArticle[];
  status: 'en_attente' | 'en_preparation' | 'prete' | 'livree';
  dateCommande: Date;
  total: number;
}

const articleSchema = new Schema<IArticle>({
  produitId: { type: Schema.Types.ObjectId, required: true },
  quantite: { type: Number, required: true, default: 1 }
});

const commandeSchema = new Schema<ICommande>({
  clientId: { type: Schema.Types.ObjectId, required: true },
  articles: { type: [articleSchema], required: true },
  status: {
    type: String,
    required: true,
    enum: ['en_attente', 'en_preparation', 'prete', 'livree'],
    default: 'en_attente'
  },
  dateCommande: { type: Date, default: Date.now },
  total: { type: Number, required: true }
}, {
  collection: 'orders'
});

const Commande = mongoose.model<ICommande>('Commande', commandeSchema);

export { Commande, ICommande, IArticle };
