import React, { Component } from 'react';
import {Row, Col, message, Collapse, Input, Radio, Spin, Tooltip, Icon, BackTop, Button, Modal, Form, InputNumber, Checkbox, Pagination} from 'antd';
import MenuNav from '../components/culturePage/header/menuNav';
import './blog_detail.scss';
import Footer from '../components/culturePage/footer/footer.js';
import CommonRecommand from '../components/pc_news_detail/commonRecommand';
import BlogComment from '../components/blog/blogComment';
import { Select } from 'antd';
import { Router, Route, Link, browserHistory } from 'react-router-dom';
import { FormOutlined } from '@ant-design/icons';
import Head from 'next/head';
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
import axios from 'axios'
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
const {Panel} = Collapse
const isServer = typeof window === "undefined";

const BlogDetailPage = (props) => {

      const {
        history,
        article,
        loading,
        id

      } = props

      // const isTabletOrDesktop = useMediaQuery({ minWidth: 768 });
  //    const device = React.useContext(Context);
      //
      // const isDesktopOrLaptop = useMediaQuery({
      // query: '(min-device-width: 1224px)'
      // })
      // const isTabletOrMobileDevice = useMediaQuery({
      //   query: '(max-device-width: 1224px)'
      // })

      console.log(props.article);
    //  const router = useRouter();
    //  const { id } = router.query;
      console.log(id)
      console.log(props.id)

    //  console.log(isServer ? "SERVER" : "BROWSER", "context:", device);

      const text = article == undefined?"":article.description;

      const url = 'https://americanmuslimtoday.com/blog-detail/'+ id;




		return (

			<div className="blog-detail">
        <Head>
           <html lang="en" />
           <title>{article.title}</title>
           <meta name="description" content={article.shortContent}></meta>
           <meta name="keywords" content="AMT BLOG" />
           <meta data-rh="true" property="article:tag" content="AMT BLOG"/>
        </Head>

        <MenuNav/>

        <Row className="blog-row">
          <Col className="" xs={0} sm={0} md={3} lg={3} xl={3}>


          </Col>

          <Col className="blog-content" xs={24} sm={24} md={13} lg={13} xl={13}>
          <div className="blog-wrapper">
          <div className="blog-list">
          <div className="flex-content">

          <div className="title">
          <span>
            {article.title}
          </span>
          </div>

          <div className="description">

{/*
          <FroalaEditorView
          model={props.article.content}
          config={{
            key: 'lSA3D-17D1A1A2B1F1F1rnC-13tf1zwtxzmjvrqiqF-7axE5maqzG2B1A2C2D6B1E1C4G1F4==',
          }}
        />  */}

           <div className="article-html fr-view" dangerouslySetInnerHTML={{__html:article.content}}></div>

          </div>

          <div className="bottom-info">

            <div className="bottom-left">
            <Icon type="user" />
            <span className="author"> {props.article.userDto && props.article.userDto.name || "anonymous"} </span>
            <time className="time"> {props.article.createdDate} </time>
            </div>

            <div className="bottom-right">
            <svg viewBox="64 64 896 896" focusable="false" data-icon="message" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M464 512a48 48 0 1096 0 48 48 0 10-96 0zm200 0a48 48 0 1096 0 48 48 0 10-96 0zm-400 0a48 48 0 1096 0 48 48 0 10-96 0zm661.2-173.6c-22.6-53.7-55-101.9-96.3-143.3a444.35 444.35 0 00-143.3-96.3C630.6 75.7 572.2 64 512 64h-2c-60.6.3-119.3 12.3-174.5 35.9a445.35 445.35 0 00-142 96.5c-40.9 41.3-73 89.3-95.2 142.8-23 55.4-34.6 114.3-34.3 174.9A449.4 449.4 0 00112 714v152a46 46 0 0046 46h152.1A449.4 449.4 0 00510 960h2.1c59.9 0 118-11.6 172.7-34.3a444.48 444.48 0 00142.8-95.2c41.3-40.9 73.8-88.7 96.5-142 23.6-55.2 35.6-113.9 35.9-174.5.3-60.9-11.5-120-34.8-175.6zm-151.1 438C704 845.8 611 884 512 884h-1.7c-60.3-.3-120.2-15.3-173.1-43.5l-8.4-4.5H188V695.2l-4.5-8.4C155.3 633.9 140.3 574 140 513.7c-.4-99.7 37.7-193.3 107.6-263.8 69.8-70.5 163.1-109.5 262.8-109.9h1.7c50 0 98.5 9.7 144.2 28.9 44.6 18.7 84.6 45.6 119 80 34.3 34.3 61.3 74.4 80 119 19.4 46.2 29.1 95.2 28.9 145.8-.6 99.6-39.7 192.9-110.1 262.7z"></path></svg>
            <span style={{marginLeft: "4px"}}>0</span>
            </div>

          </div>
          <div className="share_button" style={{marginRight: '2px' , display: "flex", marginTop:"30px"}}>
          <FacebookShareButton
            url={url}
            quote={article.headline}
            hashtag={article.headline}
          >
            <FacebookIcon size={32} round={true} />
            <FacebookShareCount url={url} />

          </FacebookShareButton>

          <TwitterShareButton
            url={url}
            title={article.headline}
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
            title={article.headline}
          //  separator={newsItem.description}
          >
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>

          <EmailShareButton
            url={url}
            //openShareDialogOnClick={true}
            //  onClick={e => e.preventDefault()}
            subject={article.headline}
            body={`I found a very good article here in americanmuslimtoday ! ${article.headline}`}
          //  body={this.createMarkup()}
          >
            <EmailIcon size={32} round={true} />
          </EmailShareButton>


          <LinkedinShareButton
            url={url}
            //openShareDialogOnClick={true}
            //  onClick={e => e.preventDefault()}
            title={article.headline}
            summary={`I found a very good article here in americanmuslimtoday ! ${article.headline}`}
          //  body={this.createMarkup()}
          >
            <LinkedinIcon size={32} round={true} />
          </LinkedinShareButton>

          <RedditShareButton
            url={url}

            title={article.headline}
          >
            <RedditIcon size={32} round={true} />

          </RedditShareButton>


          </div>

          </div>
          </div>

          </div>


          <BlogComment blogId={id}/>









          </Col>

          <Col className="right-side" xs={0} sm={0} md={8} lg={8} xl={8}>
            <CommonRecommand newsId="61921f7b-d85f-40c7-a901-9d8d9eb1c10a"  flyDirection="fadeInUp" / >
          </Col>

        </Row>


        <Footer/>

			</div>
		);

}



BlogDetailPage.getInitialProps = async function (ctx) {
    console.log(ctx)
    console.log("result")
    console.log(ctx.query.id)
    const res = await fetch(`https://api.americanmuslimtoday.net/amt-news/api/v1/posts/${ctx.query.id}?needUser=true`);
    const data = await res.json();
    return {
        article: data,
        id: ctx.query.id,
        loading: false,
    }
}


export default BlogDetailPage;
