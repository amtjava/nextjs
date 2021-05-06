import React from "react";
import { useMediaQuery, Context } from "react-responsive";
import Header from "./Header";
import HeaderMobile from "./HeaderMobile";
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import "./index.scss";
import { Button } from 'antd';
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
     <meta property="og:image" content={props.shows.bannerImage}/>
  </Head>
  <Header/>
  <Button> aaa   </Button>
  </div>
  :
  <div>
  <Head>
     <title>{props.shows.headline}</title>
     <meta property="og:image" content={props.shows.bannerImage}/>
  </Head>
  <HeaderMobile />
  </div>

  ;
};

// without it NEXT will optimze the app and do a static page rendering
// export const getServerSideProps = () => {
//   return { props: {} };
// };

MainPage.getInitialProps = async function () {
    const res = await fetch('https://api.americanmuslimtoday.net/amt-news/api/v1/news/427de6c4-8842-441b-9906-9de112711510');
    const data = await res.json();
    return {
        shows: data
    }
}

export default MainPage;
