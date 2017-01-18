export default function getContentWrapper(title, initialState, injects) {
  var doc = `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type="image/png" sizes="192x192"  href="/favicon/android-icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/favicon/manifest.json" />
          <title>${title}</title>
          <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet" />
          <link href="https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/cosmo/bootstrap.min.css" type="text/css" rel="stylesheet"/>
            <link rel="stylesheet" type="text/css" href="/css/style.css">
          <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          </script>
          <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        </head>
        <body>`
  var keys = Object.keys(injects)
  for (var i=0; i < keys.length; i++) {
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