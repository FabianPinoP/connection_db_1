import { sendEmail } from "../config/brevo/brevo.config.js"
import { welcomeUserTemplate } from "./templates/welcome.user.template.js"

const welcomeUserEmail = async ({nombre, apellido, email}) => {
  // brevo espera un array de objetos con la siguiente estructura
  const recipient = [
    {
      email: email,
      name: `${nombre} ${apellido}`
    }
  ]
  const subject = 'bienvenido a nuestra app'
  const template = await welcomeUserTemplate(nombre, apellido)
  await sendEmail(recipient, template, subject)
}

export { welcomeUserEmail }
