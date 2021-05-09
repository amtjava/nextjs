import React from "react";
import {useRouter, withRouter} from 'next/router';
import { useMediaQuery, Context, MediaQuery } from "react-responsive";
import fetch from 'isomorphic-unfetch';
import Head from 'next/head';
import "./index.scss";
import {
  Button, Row, Col, BackTop, Spin,
  Empty
} from 'antd';
import Header from '../components/mobile/home/header/header';
import MenuNav from '../components/culturePage/header/menuNav';
import { FilePdfTwoTone } from '@ant-design/icons';
import './home.scss';
import './pc_news_details.scss';
import CommonComments from '../components/pc_news_detail/commonComments';
import CommonRecommand from '../components/pc_news_detail/commonRecommand';
// import Footer from '@/components/culturePage/footer/footer.js';
import FooterMobile from '../components/mobile/home/footer/footerMobile';
import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  EmailShareButton,
  LineShareButton,
  WhatsappShareButton,
  RedditShareButton,
} from 'react-share';
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  PinterestIcon,
  EmailIcon,
  LineIcon,
  WhatsappIcon,
  RedditIcon,
} from 'react-share';
import {
  FacebookShareCount,
  HatenaShareCount,
  OKShareCount,
  PinterestShareCount,
  RedditShareCount,
  TumblrShareCount,
  VKShareCount
} from "react-share";

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
const isServer = typeof window === "undefined";

const DetailPage = (props) => {
  const {
    history,
    newsItem,
    loading

  } = props

  const isTabletOrDesktop = useMediaQuery({ minWidth: 768 });

  const device = React.useContext(Context);
  console.log(props.newsItem.headline);
  const router = useRouter();
  const { id } = router.query;
  console.log(id)
  console.log(props.id)

  console.log(isServer ? "SERVER" : "BROWSER", "context:", device);

  const text = newsItem == undefined?"":newsItem.description;

  const url = 'http://americanmuslimtoday.net:3000/details/'+ id;

  return (
  <div>
  <Head>
     <title>{props.newsItem.headline}</title>
     <meta property="og:image" content={props.newsItem.bannerImage}/>
  </Head>

  <div className="detail-page-wrapper" >


    <Row>
      <Col xs={0} sm={0} md={0} lg={0} xl={2} xxl={2}> </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={14} xxl={14}>
        {newsItem == undefined?<Empty style={
          {
            paddingTop:300,
            paddingBottom:300
          }
        } />:  <Spin tip="" spinning={loading} size="large" style={{}}>
          <div className="article-container">
            <div style={{ marginBottom: "20px", fontSize: "27px", lineHeight: "1.1", letterSpacing: "-.016em" }}>

              <h1>{newsItem.headline}</h1>
            </div>
            <div className="article-description">

              <p>{text}</p>

            </div>

            <div className="author-block">
              <div className="author-block-content">

                <div style={{ marginLeft: '8px', width: '100%' }}>

                  <div className="author-top">
                    <span className="author-name"><a className="_1OhGeD" href="/u/0340be4082b5" target="_blank" rel="noopener noreferrer" >{newsItem.author}</a></span>

                    <div className="share_button" style={{ marginRight: '2px', display: "flex" }}>


                      <FacebookShareButton
                        url={url}
                        quote={newsItem.headline}
                        hashtag={newsItem.headline}
                      >
                        <FacebookIcon size={32} round={true} />
                        <FacebookShareCount url={url} />

                      </FacebookShareButton>

                      <TwitterShareButton
                        url={url}
                        title={newsItem.headline}
                        children={<TwitterIcon size={32} round={true} />}
                      />

                      <LineShareButton
                        url={url}
                        title={"title"}
                        summary={"summary"}
                        source={"source"}
                      >
                        <LineIcon size={32} round={true} />
                      </LineShareButton>

                      <WhatsappShareButton
                        url={url}
                        title={newsItem.headline}
                      //  separator={newsItem.description}
                      >
                        <WhatsappIcon size={32} round={true} />
                      </WhatsappShareButton>

                      <EmailShareButton
                        url={url}
                        //openShareDialogOnClick={true}
                        //  onClick={e => e.preventDefault()}
                        subject={newsItem.headline}
                        body={`I found a very good article here in americanmuslimtoday ! ${newsItem.headline}`}
                      //  body={this.createMarkup()}
                      >
                        <EmailIcon size={32} round={true} />
                      </EmailShareButton>


                      <LinkedinShareButton
                        url={url}
                        //openShareDialogOnClick={true}
                        //  onClick={e => e.preventDefault()}
                        title={newsItem.headline}
                        summary={`I found a very good article here in americanmuslimtoday ! ${newsItem.headline}`}
                      //  body={this.createMarkup()}
                      >
                        <LinkedinIcon size={32} round={true} />
                      </LinkedinShareButton>

                      <RedditShareButton
                        url={url}

                        title={newsItem.headline}
                      >
                        <RedditIcon size={32} round={true} />

                      </RedditShareButton>




                    </div>

                  </div>

                  <div className="author-bottom">
                    <time dateTime="2018-12-18T07:01:11.000Z" style={{ paddingRight: '10px' }}> {newsItem.updatedDate}</time>
                    {newsItem.pdf
                      && <a href={newsItem.pdf} target="_blank" className="">
                        <Button type="primary" style={{ marginRight: '8px' }}>
                          PDF
<FilePdfTwoTone twoToneColor="red" style={{ fontSize: '19px' }} />
                        </Button>

                      </a>}

                  </div>

                </div>

              </div>

            </div>



            <img alt="" src={newsItem.bannerImage} className="top-image" style={{ }} />
            <div className="article-html fr-view" dangerouslySetInnerHTML={{__html:newsItem.fullNews}}></div>
            <hr />
          </div>

          <CommonComments uniquekey={id} />
        </Spin>
     }
       </Col>

      <Col xs={0} sm={0} md={0} lg={0} xl={1} xxl={1}></Col>

      <Col xs={24} sm={24} md={24} lg={24} xl={6} xxl={6}>
        <CommonRecommand newsId={id} flyDirection="fadeInUp" />
      </Col>
      <Col xs={0} sm={0} md={0} lg={0} xl={1} xxl={1}>  </Col>

    </Row>


  </div>

  </div>


  )

  ;
};

// without it NEXT will optimze the app and do a static page rendering
// export const getServerSideProps = () => {
//   return { props: {} };
// };

DetailPage.getInitialProps = async function (ctx) {
    console.log(ctx)
    console.log("result")
    console.log(ctx.query.id)
    const res = await fetch(`https://api.americanmuslimtoday.net/amt-news/api/v1/news/${ctx.query.id}`);
    const data = await res.json();
    return {
        newsItem: data,
        id: ctx.query.id,
        loading: false,
    }
}

export default DetailPage;
