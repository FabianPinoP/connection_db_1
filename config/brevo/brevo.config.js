import brevo from '@getbrevo/brevo'
import { envs } from '../envs.js'


const apiInstance = new brevo.TransactionalEmailsApi()
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  envs.brevoApiKey
)

async function sendEmail (recipients, template, subject, attachments = []) {
  try {
    const sendSmtpEmail = new brevo.SendSmtpEmail()
    sendSmtpEmail.subject = subject
    sendSmtpEmail.to = recipients // array de emails
    sendSmtpEmail.htmlContent = template
    // usar datos de la cuenta que creo la suscripcion
    sendSmtpEmail.sender = {
      name: 'r-side',
      email: 'contacto@rside.cl'
    }

    if (attachments.length > 0) {
      sendSmtpEmail.attachment = attachments.map(file => ({
        name: file.filename, // Nombre del archivo
        content: file.content.toString('base64') // Contenido en base64
      }))
    }
    await apiInstance.sendTransacEmail(sendSmtpEmail)
  } catch (error) {
    console.error(error)
  }
}

export { sendEmail }
