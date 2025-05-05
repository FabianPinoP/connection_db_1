const welcomeUserTemplate = async (nombre, apellido) => {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Bienvenida</title>
  </head>
  <body style="margin:0; padding:0; font-family:Arial, sans-serif; background-color:#f4f4f4;">
    <table cellpadding="0" cellspacing="0" width="100%" style="background-color:#f4f4f4; padding: 20px 0;">
      <tr>
        <td align="center">
          <table cellpadding="0" cellspacing="0" width="600" style="background-color:#ffffff; padding: 30px; border-radius:8px;">
            <tr>
              <td align="center" style="padding-bottom: 20px;">
                <h1 style="color:#333333; margin:0; font-size:24px;">¡Bienvenido(a) ${nombre} ${apellido}!</h1>
              </td>
            </tr>
            <tr>
              <td style="color:#555555; font-size:16px; line-height:24px;">
                <p style="margin:0;">
                  Estamos muy felices de tenerte con nosotros. A partir de ahora, formarás parte de una comunidad increíble.
                </p>
                <p style="margin:20px 0 0 0;">
                  Si tienes alguna duda o necesitas ayuda, no dudes en contactarnos.
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-top: 30px;">
                <a href="https://tusitio.com" style="background-color:#007BFF; color:#ffffff; text-decoration:none; padding:12px 24px; border-radius:5px; display:inline-block;">Ir a la plataforma</a>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-top: 40px; color:#999999; font-size:12px;">
                © 2025 Tu Empresa. Todos los derechos reservados.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`
}

export { welcomeUserTemplate }