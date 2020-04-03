import { Injectable } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private emailComposer: EmailComposer, private alertController: AlertController) {

  }
  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: msg,
      buttons: ['OK']
    });
    await alert.present();
  }


  emailSend(
    to: string,
    cc: string,
    bcc: string,
    attachment: string,
    subject: string,
    body: string) {
    let email: any = {
      to: 'desafio@prolins.com.br',
      cc: cc,
      subject: subject,
      attachments: attachment,
      body: body,
      isHtml: true
    };

    this.emailComposer.open(email);
  }
}
