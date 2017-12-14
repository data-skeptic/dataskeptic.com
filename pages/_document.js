import Document, { Head, Main, NextScript } from "next/document";
import { ServerStyleSheet , injectGlobal} from "styled-components";
import styledNormalize from 'styled-normalize'

injectGlobal`
  ${styledNormalize}
  @font-face {
    font-family: 'SF Light';
    src: url('/static/fonts/SFUIDisplay-Light.otf');
  }
  @font-face {
    font-family: 'SF Regular';
    src: url('/static/fonts/SFUIDisplay-Regular.otf');
  }
  @font-face {
    font-family: 'SF Medium';
    src: url('/static/fonts/SFUIDisplay-Medium.otf');
  } 
  @font-face {
    font-family: 'SF Bold';
    src: url('/static/fonts/SFUIDisplay-Bold.otf');
  }
  body {
    font-family: 'SF Regular';
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