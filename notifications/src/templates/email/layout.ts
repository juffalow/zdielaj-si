interface Parameters {
  title: string;
  content: string;
  email: string;
  unsubscribeUrl: string;
}

export default function layout({ title, content, email, unsubscribeUrl }: Parameters): string {
  return `
  <!DOCTYPE html>
  <html lang="sk">
    <head>
      <meta charset="UTF-8">
      <meta name="x-apple-disable-message-reformatting">
      <title>${title}</title>
      <style>
        body {
          font-family: Open Sans,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Apple Color Emoji,Helvetica Neue,Arial,sans-serif;
        }
      </style>
    </head>
    <body style="margin:0;padding:0;">
      <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#F8F9F9;font-size:18px;">
        <tr>
          <td style="padding:20px;background:#343a40!important;" align="center">
            <a href="https://zdielaj.si" style="color: #fff; text-decoration: none; font-size: 1.2rem;">Zdielaj.si</a>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding:0;">
            <table role="presentation" style="width:600px;border-collapse:collapse;border-spacing:0;text-align:left;">
              <tr>
                <td style="padding:20px;">
                  ${content}
                </td>
              </tr>
              <tr>
                <td>
                  <hr />
                  <p style="text-align: center;"><a href="https://zdielaj.si" style="color: #000; font-size: 1.2rem; text-decoration: none;">Zdielaj.si</a></p>
                  <p style="font-size: 14px;">Tento e-mail bol vygenerovaný automaticky. Prosím, neodpovedaj naň.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr style="background: #fff; font-size: 14px;">
          <td align="center">
            E-mail bol odoslaný na <a href="mailto:${email}">${email}</a>. Odosielané notifikácie môžeš kedykoľvek <a href="${unsubscribeUrl}">zmeniť</a>.
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}
