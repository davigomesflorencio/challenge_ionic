import { Injectable } from '@angular/core';
import { Dados } from '../models/dados.model';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DesafioService {

  dadosCol: AngularFirestoreCollection<Dados>;

  constructor(afs: AngularFirestore) {
    this.dadosCol = afs.collection<Dados>('dados')
  }

  save(d: Dados): Promise<void> {
    return this.dadosCol.add(Object.assign({}, d)).then(objeto => {
      d.id = objeto.id
      this.update(d)
    })
  }
  update(d: Dados): Promise<void> {
    return this.dadosCol.doc(d.id)
      .update(Object.assign({}, d))
  }
}
