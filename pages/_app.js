import {createGlobalStyle} from "styled-components";
import {CartContextProvider} from "@/components/CartContext";
import {SessionProvider} from "next-auth/react";
import '../components/style/global.css';
import '@fontsource/play'; // Font "Play"
import '@fontsource/chakra-petch';

const GlobalStyles = createGlobalStyle`
  body{
    background-color: #eee;
    padding:0;
    margin:0;
    font: 'play';
  }
  hr{
    display: block;
    border:0;
    border-top:1px solid #ccc;
  }
`;

export default function App({ Component, pageProps: {session, ...pageProps } }) {
  return (
    <>
      <GlobalStyles />
      <SessionProvider session={session}>
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </SessionProvider>
    </>
  );
}
