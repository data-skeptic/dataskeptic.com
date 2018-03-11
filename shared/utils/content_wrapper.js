const generateMeta = ({ title, description, author, image }) => {
  const metaImage = !!image
    ? `
    <meta property="og:image" content="${image}">
   `
    : ''

  let meta = `
        <title>${title}</title>
        <meta name="author" content="${author}">
        <meta name="description" content="${description}">
        <meta property="og:title" content="${title}">
        <meta property="og:description" content="${description}">
        ${metaImage}
  `
  return meta.trim()
}

export default function getContentWrapper(meta, initialState, injects, env) {
  var doc = `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="manifest" href="/favicon/manifest.json" />
          ${generateMeta(meta)}
          <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet" />
          <link href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/cosmo/bootstrap.min.css" type="text/css" rel="stylesheet"/>
          ${
            env === 'prod'
              ? '<link href="/main.css" type="text/css" rel="stylesheet"/>'
              : ''
          }
          <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          </script>
          <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        </head>
        <body>`
  var keys = Object.keys(injects)
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    var val = injects[key]
    doc += `<div id="${key}">${val}</div>`
  }
  doc += `<script type="application/javascript" src="/bundle.js"></script>
          <script type="text/javascript" src="https://js.stripe.com/v2/"></script>
        </body>
      </html>
      `
  return doc
}
