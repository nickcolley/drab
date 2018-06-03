export default ({ title, children }) => {
  return (
    <html lang='en'>
      <head>
        <title>{title}</title>
        <meta charset='utf-8' />
        <meta http-equiv='X-UA-Compatible' content='IE=edge' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </head>
      <body>
        {children}
        <script defer src='./main.bundle.js' />
      </body>
    </html>
  )
}
