import Document from 'next/document';
//highlight-next-line
import { ServerStyleSheet } from 'styled-components';
export default class MyDocument extends Document {
    static async getInitialProps(ctx: any) {
        //highlight-next-line
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;
        try {
            ctx.renderPage = () =>
                originalRenderPage({
                    //highlight-next-line
                    enhanceApp: (App: any) => (props: any) =>
                        sheet.collectStyles(<App {...props} />),
                });
            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                ),
            };
        } finally {
            sheet.seal();
        }
    }
}
