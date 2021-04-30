import React from "react";
import { useMediaQuery, Context } from "react-responsive";
import Header from "./Header";
import HeaderMobile from "./HeaderMobile";
import fetch from 'isomorphic-unfetch';

import Head from 'next/head';
const isServer = typeof window === "undefined";

const MainPage = (props) => {
  const isTabletOrDesktop = useMediaQuery({ minWidth: 768 });
  const device = React.useContext(Context);
  console.log(props.shows.headline);

  console.log(isServer ? "SERVER" : "BROWSER", "context:", device);

  return isTabletOrDesktop ?
  <div>
  <Head>
     <title>{props.shows.headline}</title>
   </Head>
   <Header/>
   </div>
  :
  <HeaderMobile />;
};

// without it NEXT will optimze the app and do a static page rendering
// export const getServerSideProps = () => {
//   return { props: {} };
// };

MainPage.getInitialProps = async function () {
    const res = await fetch('https://api.americanmuslimtoday.net/amt-news/api/v1/news/c72473b6-64fd-40fb-ba1b-d65838bc5168');
    const data = await res.json();
    return {
        shows: data
    }
}

export default MainPage;
