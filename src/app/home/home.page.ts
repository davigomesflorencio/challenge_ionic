import { Component, OnInit } from '@angular/core';
import { Dados } from '../models/dados_model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Desafio } from '../services/desafio';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  formD!: FormGroup;
  dado!: Dados;
  msgResult: string = '';
  geoLatitude: number = 0;
  geoLongitude: number = 0;
  geoAccuracy: number = 0;
  nome: FormControl = new FormControl('', [Validators.required]);
  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  // telefone: FormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.pattern('^[(]{1}[0-9]{2}[)]{1}[0-9]{4,5}-[0-9]{4}'),
  // ]);

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private desafioService: Desafio,
  ) {}

  ngOnInit() {
    this.formD = this.formBuilder.group({
      nome: this.nome,
      email: this.email,
      // telefone: this.telefone,
    });
    this.dado = new Dados();
    this.getGeolocation();
  }

  get fields() {
    return this.formD.controls;
  }

  getGeolocation() {
    Geolocation.getCurrentPosition()
      .then((resp: any) => {
        this.geoLatitude = resp.coords.latitude;
        this.geoLongitude = resp.coords.longitude;
        this.geoAccuracy = resp.coords.accuracy;
      })
      .catch((error: any) => {
        this.presentToast(
          'Error ao pegar a localização:' + JSON.stringify(error),
        );
      });
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }

  onSubmit() {
    console.log('Formulário enviado:', this.formD.value);
    if (!this.formD.invalid) {
      this.dado = this.formD.value;
      this.dado.latitude = this.geoLatitude;
      this.dado.longitude = this.geoLongitude;

      this.desafioService
        .save(this.dado)
        .then((result) => {
          this.msgResult = `Informações enviadas com sucesso!`;

          this.presentToast(this.msgResult);

          console.log(JSON.stringify(this.dado));

          //   this.emailService.emailSend(
          //     "davigomesflorencio@alu.ufc.br",
          //     "davigomesflorencio@gmail.com",
          //     "davigomesflorencio@gmail.com",
          //     "",
          //     "Desafio",
          //     "<p>" + JSON.stringify(this.dado) +
          //     "<h3>LINK</h3>" +
          //     "https://www.google.com/maps/search/?api=1&query=" + this.geoLatitude + "," + this.geoLongitude + " </p>");
          console.log(
            'https://www.google.com/maps/search/?api=1&query=' +
              this.geoLatitude +
              ',' +
              this.geoLongitude +
              ' </p>',
          );
          this.formD.reset();
        })
        .catch((err) => {
          console.log('erro - ' + err);
          this.msgResult = `Erro ao salvar as informações: ${err}`;
          this.presentToast(this.msgResult);
        });
    } else {
      this.msgResult = `Formulário inválido! Por favor, preencha todos os campos corretamente.`;
      this.presentToast(this.msgResult);
    }
  }
}
