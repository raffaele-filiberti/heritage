import Document, {Head, Main, NextScript} from 'next/document'
import GoogleTagManager from "../components/Global/GoogleTagManager";

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return {...initialProps}
    }

    render() {
        return (
            <html lang="en">
            <Head>
                <link rel="stylesheet" href="/_next/static/style.css"/>
                <GoogleTagManager gtmId={''}/>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
            </html>
        )
    }
}

