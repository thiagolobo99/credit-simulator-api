import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendSimulationToEmail(to: string, simulationData: any) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject: 'Simulação de Crédito',
      html: `<h1>Detalhes da Simulação de Crédito</h1><p>${simulationData}</p>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('E-mail enviado!');
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
    }
  }
}
