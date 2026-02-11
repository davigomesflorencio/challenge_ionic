import { Injectable, inject } from '@angular/core';
import { Dados } from '../models/dados_model';
import {
  Firestore,
  collection,
  addDoc,
  updateDoc,
  doc,
  DocumentReference,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class Desafio {
  private firestore = inject(Firestore);
  dadosCollection = collection(this.firestore, 'dados');

  save(d: Dados): Promise<void> {
    return addDoc(this.dadosCollection, Object.assign({}, d)).then(
      (ref: DocumentReference) => {
        d.id = ref.id;
        return this.update(d);
      },
    );
  }

  update(d: Dados): Promise<void> {
    const dadosRef = doc(this.firestore, 'dados', d.id!);
    return updateDoc(dadosRef, Object.assign({}, d) as any);
  }
}
