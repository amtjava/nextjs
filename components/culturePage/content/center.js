import React, { Component } from 'react';
import { Card, Col } from 'antd';
import './public.scss';
import './center.scss';
import Swiper from 'swiper/js/swiper.min.js';
import { Router, Route, Link, browserHistory } from 'react-router-dom';
import 'swiper/css/swiper.min.css';
import $ from 'jquery';
import "animate.css";
import FourBlocks from '@/components/pc/culturePage/content/fourBlocks.js';
const { Meta } = Card;

class Center extends Component {

    constructor() {
    super();
    this.state = {
      news: [],
      headline_news:[],
      sub_news:[],
    };
  }

    componentDidMount() {



        // get headline news
        var myFetchOptions = {
            method: 'GET'
          };
          console.log('1111');
          fetch("https://api.americanmuslimtoday.net/amt-news/api/v1/news?page=1&category=5e7ecc1b-e63d-497a-b646-7706dc3f4545", myFetchOptions)
       .then(res => res.json())
       .then(data => {
           console.log(data.list[0])
           this.setState({
             news: data.list,
             headline_news: data.list[0]
           });
         })

         // get sub news
         var myFetchOptions = {
             method: 'GET'
           };
           console.log('1111');
           fetch("https://api.americanmuslimtoday.net/amt-news/api/v1/news?page=1&pageSize=4&category=5e7ecc1b-e63d-497a-b646-7706dc3f4545", myFetchOptions)
        .then(res => res.json())
        .then(data => {
            this.setState({
              sub_news: data.list
            });
          })
    }
    componentDidUpdate(){
      let listSwiper = new Swiper('.other-bottom-img-block', {
          // autoplay: {
          //     disableOnInteraction: false, //触碰后自动切换是否停止
          //     delay: 1000
          // },

          autoplay: {
              disableOnInteraction: true, //手动滑动之后不打断播放
              delay: 1000
          },
          loop: true,
          speed: 700,
          centeredSlides: false,       //为true设置模块居中
          spaceBetween : 20,          //slide之间的距离
          slidesOffsetBefore: 50,     //设定slides与wrapper左边框的偏移量
          slidesOffsetAfter: 50,      //设定slides与wrapper右边框的偏移量
          slidesPerView : 'auto',
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents:true,//修改swiper的父元素时，自动初始化swiper
          navigation: {
              prevEl: '.bottom-img-block-prev',
              nextEl: '.bottom-img-block-next'
          }
      });
      // listSwiper.el.onmouseover = function(){
      //     listSwiper.autoplay.stop();
      // }
      // listSwiper.el.onmouseout = function(){
      //     listSwiper.autoplay.start();
      // }

      this.scrollFadeIn();

    }

    scrollFadeIn() {
        let num = 0,
            topArr = [];

        $(".other-center-module").find(".animated").each(function(){
            topArr.push($(this).offset().top - $(window).height() + 25);
            // 默认展示小于屏幕高度的
            if ($(this).offset().top < $(window).height()) {
                $(this).addClass('fadeInUp');
            }
        });

        $(window).scroll(res => {
            if(num < topArr.length && $(window).scrollTop() > topArr[num]){
                $(".other-center-module").find(".animated").eq(num).addClass('fadeInUp');
                num += 1;
            }
        })
    }

    render() {
        const dateStyle = {
          fontSize: "11px",
          lineHeight: "20.8px",
          fontWeight: 500,
        }
        const {news, headline_news, sub_news} = this.state;
        const news_swiper = news.length
          ? news.map((newsItem, index) => (
            <div key={index} className="swiper-slide">
                <a href="#!">
                      <img src={newsItem.bannerImage}/>
                      <span className="text" >{newsItem.headline}</span>

                </a>
            </div>
          ))
          : 'We are loading news...';
        let imgUrl;
        imgUrl =  headline_news.bannerImage ;

        return (
            <div className="other-center-module left-module">
                <div className="news-module animated">
                    <div className="top-img-block">
                    <div className="top-spot">
                            <span className="spot-title" style={{fontSize: '16px', fontWeight: '700', color: '#f5eaea'}}>AMT Culture | In Focus</span>
                        </div>
                    {/*    <div className="module-title animated ">
                            <span className="title-text">Culture Headline News</span>
                        </div>  */}
                        <Link to={`/details/${this.state.headline_news.newsId}`}  target="_blank" className="top-img-link" style={{backgroundImage: 'url(https://www.rxwallpaper.site/wp-content/uploads/navyblue-backgroundart-dark-blue-texturecarlbert-design-800x800.jpg)'}}>

                            <div className="top">
                                <div className="img-back" style={{backgroundImage: 'url(' + imgUrl + ')'}}></div>
                                <div className="text-block">
                                    <a className="text-title">{this.state.headline_news.headline}</a>
                                    <hr />
                                    <div className="pinglun">
                                        <span> BY {this.state.headline_news.author} </span>
                                    </div>
                                </div>
                            </div>
                            <div className="bottom">
                                <p class="text">
                                {this.state.headline_news.description}
                                </p>
                            </div>
                        </Link>
                    </div>
                  {/* <div className="other-bottom-img-block swiper-container">
                        <div className="swiper-wrapper">
                                    {news_swiper}

                        </div>
                        <div class="swiper-button-prev bottom-img-block-prev"></div>
                        <div class="swiper-button-next bottom-img-block-next"></div>
                    </div> */}
                </div>

                <div className="big-center-module">
                    <div className="module-title animated">
                        <span className="title-text">Literature & Books</span>
                    </div>
                    <FourBlocks subCategory={"1480c155-3a21-4c3b-be9c-e03a0d8e2fcd"} hoverColor={"lightgrey"}/>
                </div>

                <div className="big-center-module">
                    <div className="module-title animated">
                        <span className="title-text">Fashion & Style</span>
                    </div>
                    <FourBlocks subCategory={"ef1b1803-2225-4a2c-9bb3-90aabb90aaaa"} hoverColor={"lightblue"}/>
                </div>



            </div>
        )
    }
}

export default Center
