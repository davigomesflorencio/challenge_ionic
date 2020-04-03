import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { Dados } from '../../models/dados.model';

import { DesafioService } from '../../services/desafio.service';
import { EmailService } from '../../services/email.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  formD: FormGroup;
  dado: Dados;
  msgResult: string;
  geoLatitude: number;
  geoLongitude: number;
  geoAccuracy: number;

  constructor(private formBuilder: FormBuilder, private desafioService: DesafioService,
    private toastController: ToastController, private emailComposer: EmailComposer,
    private emailService: EmailService, private geolocation: Geolocation) {

  }

  get fields() { return this.formD.controls; }

  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.geoLatitude = resp.coords.latitude;
      this.geoLongitude = resp.coords.longitude;
      this.geoAccuracy = resp.coords.accuracy;
    }).catch((error) => {
      this.presentToast('Error ao pegar a localização:' + JSON.stringify(error));
    });
  }
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  ngOnInit() {
    this.formD = this.formBuilder.group({
      'nome': new FormControl('', [Validators.required]),
      'email': new FormControl('', [Validators.required, Validators.email]),
      'telefone': new FormControl('', [Validators.required, Validators.pattern("^[(]{1}[0-9]{2}[)]{1}[0-9]{4,5}-[0-9]{4}")])
    });
    this.dado = new Dados();
    this.getGeolocation();
  }

  onSubmit() {
    if (!this.formD.invalid) {
      this.dado = this.formD.value;
      this.desafioService.save(this.dado).then((result) => {
        this.msgResult = `Informações enviadas com sucesso!`;

        this.presentToast(this.msgResult);

        console.log(JSON.stringify(this.dado));

        this.emailService.emailSend(
          "davigomesflorencio@alu.ufc.br",
          "davigomesflorencio@gmail.com",
          "davigomesflorencio@gmail.com",
          "",
          "Desafio",
          "<p>" + JSON.stringify(this.dado) +
          "<h3>LINK</h3>" +
          "https://www.google.com/maps/search/?api=1&query=" + this.geoLatitude + "," + this.geoLongitude + " </p>");
        this.formD.reset();


      }).catch((err) => {
        console.log("erro - " + err);
        this.msgResult = `Erro ao salvar as informações: ${err}`;
        this.presentToast(this.msgResult);

      });
    }
  }

}