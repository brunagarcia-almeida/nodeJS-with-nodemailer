const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const porta = 443;

app.get('/', (req, res) => {
  res.send('Enviando e-mail com o Nodemailer!');
});
app.get('/sendemail', async (req, res) => {
  // nodemailer.createTransport({
  //   host: "smtp.example.com",
  //   port: 587,
  //   secure: false, // upgrade later with STARTTLS
  //   auth: {
  //     user: "username",
  //     pass: "password",
  //   },
  // });
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c1d9f08304f4ea",
      pass: "a3a51b5e86086c"
    }
  });
  var message = {
    from: "noreplay@reprograme-se.com",
    to: "reprograme-se@reprograme-se.com",
    subject: "Instrução para recuperar a senha",
    text: "Olá Bruna, \n\n Você solicitou alteração de senha. \n\n Equipe Reprograme-se.",
    html: "<p>Olá Bruna, <br><br> Você solicitou alteração de senha. <br><br>Equipe Reprograme-se.</p>",
  };
  transport.sendMail(message, function(err) {
    if(err) {
      return res.status(400).json({
        erro: true,
        mensagem: 'Erro: E-mail não enviado!'
      });
    } else {
      return res.json({
        erro: false,
        mensagem: 'E-mail enviado com sucesso!'
      });
    }
  });
});
app.listen(porta, () => {
  console.log('Servidor rodando na porta: ', porta);
})