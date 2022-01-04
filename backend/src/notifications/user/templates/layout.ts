export default function layout(title: string, content: string): string {
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
      <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;">
        <tr>
          <td align="center" style="padding:0;">
            <table role="presentation" style="width:600px;border-collapse:collapse;border-spacing:0;text-align:left;">
              <tr>
                <td style="padding:20px;background:#343a40!important;">
                  <a href="https://zdielaj.si" style="color: #fff; text-decoration: none; font-size: 1.2rem;">Zdielaj.si</a>
                </td>
              </tr>
              <tr>
                <td style="padding:20px;">
                  ${content}
                </td>
              </tr>
              <tr>
                <td style="padding:20px;background:#343a40!important;">
                  <a href="https://zdielaj.si" style="color: #fff; font-size: 1.2rem; text-decoration: none;">Zdielaj.si</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}
