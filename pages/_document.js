import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet , injectGlobal} from "styled-components";
import styledNormalize from 'styled-normalize'

injectGlobal`
  ${styledNormalize}
  
  body {
    font-size: 15px;
    font-weight: 500;
    margin: 0;
    padding: 0;
    font-family: "Source Sans Pro", Calibri, Candara, Arial, sans-serif;
    line-height: 1.42857143;
    color: #333333;
    background-color: #ffffff;
  }
  
  * {
      outline: none
  }
  
  a {
      color: #000;
  }
  
  a,a:hover {
      text-decoration: none
  }
  
  a:hover {
      color: #333;
  }
`;

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {

    console.log(styledNormalize)
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
          <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro" rel="stylesheet" />
          {this.props.styleTags}
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
      </html>
    );
  }
}