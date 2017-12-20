import Document, {Head, Main, NextScript} from "next/document";
import {ServerStyleSheet, injectGlobal} from "styled-components";
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
  
  h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
    font-weight: 300;
    line-height: 1.1;
    color: inherit;
  }
  
  h1, .h1, h2, .h2, h3, .h3 {
    margin-top: 21px;
    margin-bottom: 10.5px;
  }
  
  h3, .h3 {
    font-size: 26px;
  }
`;

export default class MyDocument extends Document {
    render() {
        const sheet = new ServerStyleSheet();
        const main = sheet.collectStyles(<Main/>)
        const styleTags = sheet.getStyleTags();

        return (
            <html>
            <Head>
                <style dangerouslySetInnerHTML={{ __html: styleTags}} />
            </Head>
            <body>
            {main}
            <NextScript/>
            </body>
            </html>
        );
    }
}