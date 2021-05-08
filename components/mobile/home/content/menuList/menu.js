import React, { Component } from 'react';
import Swiper from 'swiper/js/swiper.min.js';
import 'swiper/css/swiper.min.css';
import './menu.scss';
import { Router, Route, Link, browserHistory } from 'react-router-dom';
class Menu extends Component {

    constructor() {
    super();
    this.state = {
      adv1:[],


    };
  }


    componentDidMount() {



            // 广告
            var myFetchOptions = {  //广告     0f484831-2031-450e-8173-3f470290f28a
          method: 'GET'
          };
          fetch("https://api.americanmuslimtoday.net/amt-news/api/v1/news?page=1&category=c585a939-2be3-4f7c-969b-402cac7713c9", myFetchOptions)
          .then(response => response.json())
          .then(json => this.setState({adv1: json.list}));






        new Swiper('.menuListSwiper', {
            pagination: {
                el: '.swiper-pagination',
            },
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
       observeParents:true//修改swiper的父元素时，自动初始化swiper

        });
      let mySwiper = new Swiper('.adverSwiper',{
          autoplay: true,
        //  loop: true,
      //    delay: 100,
      //    speed: 700,
      //    centeredSlides: false,       //为true设置模块居中
          spaceBetween : 10,          //slide之间的距离
      //    slidesOffsetBefore: 50,     //设定slides与wrapper左边框的偏移量
      //    slidesOffsetAfter: 50,      //设定slides与wrapper右边框的偏移量
          slidesPerView : '1.5',
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
     observeParents:true//修改swiper的父元素时，自动初始化swiper


        });
        // mySwiper.el.onmouseout = function(){
        //   mySwiper.autoplay.start();
        // }
    }

    render(){
  //    console.log(this.props.categoryList);
    //   const category_list =  this.props.categoryList.map((newsItem, index) => (
    //     <Link className="menublock" to={`/classifiedlist/${newsItem.id}`} target="_blank"  >
    //         <img src={newsItem.icon} />
    //         <span className="menutitle">{newsItem.category}</span>
    //     </Link>
    // ))
      const {adv1} = this.state
      const adv_swiper = adv1.length
          ? adv1.map((newsItem, index) => (
            <div key={index} className="swiper-slide">

                      <img src={newsItem.bannerImage}/>

            </div>


          ))
          : 'We are loading news...';
      console.log(adv1);
        return (
            <div className="menuList">
              {/*  <div className="swiper-container menuListSwiper">
                    <div className="swiper-wrapper">
                        <div className="swiper-slide">
                            <Link className="menublock" to={`/classifiedlist/123`} target="_blank"  >
                                <img src="https://c3.nychinaren.com/images/mobile/menu-news.png"/>
                                <span className="menutitle">news</span>
                            </Link>

                            <a href="javascript:;" className="menublock">
                                <img src="https://c3.nychinaren.com/images/mobile/menu-star.png"/>
                                <span className="menutitle">review</span>
                            </a>
                            <a href="javascript:;" className="menublock">
                                <img src="https://c3.nychinaren.com/images/mobile/menu-forum.png"/>
                                <span className="menutitle">blog</span>
                            </a>
                            <a href="javascript:;" className="menublock">
                                <img src="https://c3.nychinaren.com/images/mobile/menu-video.png"/>
                                <span className="menutitle">video</span>
                            </a>
                            <a href="javascript:;" className="menublock">
                                <img src="https://c3.nychinaren.com/images/mobile/menu-house-rent.png"/>
                                <span className="menutitle">house</span>
                            </a>
                            <a href="javascript:;" className="menublock">
                                <img src="https://c3.nychinaren.com/images/mobile/menu-job.png"/>
                                <span className="menutitle">job</span>
                            </a>
                            <a href="javascript:;" className="menublock">
                                <img src="https://c3.nychinaren.com/images/mobile/menu-live.png"/>
                                <span className="menutitle">living</span>
                            </a>
                            <a href="javascript:;" className="menublock">
                                <img src="https://c3.nychinaren.com/images/mobile/menu-deals.png"/>
                                <span className="menutitle">deal</span>
                            </a>
                        </div>
                        <div className="swiper-slide">
                          {category_list}
                        </div>
                    </div>
                    <div className="swiper-pagination"></div>
                </div>  */}

                <div className="swiper-container adverSwiper">
                    <div className="swiper-wrapper">

                        {adv_swiper}

                    </div>
                </div>
            </div>
        )
    }
}

export default Menu
