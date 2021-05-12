import React, { Component } from 'react';
import './commonRecommand.scss';
import $ from 'jquery';
import "animate.css";
import { Router, Route, Link, browserHistory } from 'react-router-dom';
import Carousel from 'nuka-carousel';
// import img from "../../assets/images/one.jpg"

class CommonRecommand extends Component {
  constructor() {
  super();
  this.state = {
      news: '',
			adv: 6,
			page:1,
			more_news:true,
			date:[],
			adv1:[],
      categoryId:'',
  };

};

  componentWillMount(){



  }
componentDidMount(){
  var self = this.props
        var myFetchOptions = {  //广告
        method: 'GET'
        };
        fetch("https://api.americanmuslimtoday.net/amt-news/api/v1/news?page=1&category=f23cf76d-8c33-4c0a-9f0f-b1da8cd0e230", myFetchOptions)
        .then(response => response.json())
        .then(json => this.setState({adv1: json.list}));

// from the newsid we get the news data and get news_category
var myFetchOptions = {
  method: 'GET'
};
fetch("https://api.americanmuslimtoday.net/amt-news/api/v1/news/" + this.props.newsId, myFetchOptions).then(response => response.json())
.then(json => {
    const {status} = json
    if(status != "NOT_FOUND"){
        this.setState({categoryId: json.categories[0].categoryId});
        var myFetchOptions = {
            method: 'GET'
          };

          fetch("https://api.americanmuslimtoday.net/amt-news/api/v1/news/list?page=1&category=" + json.categories[0].categoryId, myFetchOptions)
        .then(res => res.json())
        .then(data => {

           this.setState({
             news: data.list,

           });
         })

    }


});








};



    scrollFadeIn() {
      let num = 0,
          topArr = [];

      $(".left-module").find(".news-block").each(function(){
          topArr.push($(this).offset().top - $(window).height() + 75)
      });

      $(window).scroll(res => {
          if($(window).scrollTop() > 20){
              $(".left-module").find(".module-title").addClass(this.props.flyDirection);
          }
          if(num < topArr.length && $(window).scrollTop() > topArr[num]){
              $(".left-module").find(".news-block").eq(num).addClass(this.props.flyDirection);
              num += 1;
          }
      })
    }
    componentDidUpdate(prevProps,prevState){
        this.scrollFadeIn();

    }

    render() {

		const settings = {
		autoplay: true,
		withoutControls: true,
		wrapAround:true
	};
      		const {news} = this.state;
        // let imgUrl = img;
        // const  showImage = {
        //     backgroundImage: 'url(' + imgUrl + ')'
        // }

        const newsList = news.length
    ? news.map((newsItem, index) => (
      <div className="news-block" key={index} style={{marginBottom: "20px"}}>
          <a href={`/details/${newsItem.newsId}`} className="toLink" target="_blank">
              <div className="row-article">
                  <div className="img-comp">
                      <div className="img-show" style={{  backgroundImage: 'url(' + newsItem.bannerImage + ')'}}>  </div>
                  </div>
                  <div className="art-comp" span={20}>
                      <span className="art-title">    {newsItem.headline}</span>
                      <span className="art-content">{newsItem.author}</span>
                  </div>
              </div>
              <p className="art-time">{newsItem.publishedAt}</p>
          </a>

       <div className="big-imgShow"  style={{"display":  (index+1)%5==0? 'block':'none'}}>

   {
                 <Carousel {...settings}>

                 {
                   this.state.adv1.map((newsItem,index)=>{
                     return (
                         <img key={index} src={newsItem.bannerImage} />

                     )
                   })
                 }
                 </Carousel>
     }




        </div>

      </div>
    ))
    : 'We are loading...';

        return (
            <div className="left-module">
              <div className="module-title-box">
                <div className="module-title">
                    {/* <svg className="icon" aria-hidden="true" style={{width: 35,height: 30}}>
                        <use xlinkHref="#icon-xinwen3"></use>
                    </svg> */}
                    <span className="title-text" style={{color:'#ffffff'}}>Recommended News</span>
                </div>
              </div>
                <div className="news-module">

                    {newsList}
{/*
                    <div className="news-block animated">
                        <a href="javascript:;" className="toLink">
                            <div className="row-article">
                                <div className="img-comp">
                                    <div className="img-show" style={showImage}></div>
                                </div>
                                <div className="art-comp" span={20}>
                                    <span className="art-title">Samsung confirms Galaxy S11 event for February 11th-The Verge</span>
                                    <span className="art-content">by Chris Welch</span>
                                </div>
                            </div>
                            <p className="art-time">2020-01-13</p>
                        </a>
                    </div>

                    <div className="news-block animated">
                        <a href="javascript:;" className="toLink">
                            <div className="row-article">
                                <div className="img-comp">
                                    <div className="img-show" style={showImage}></div>
                                </div>
                                <div className="art-comp" span={20}>
                                    <span className="art-title">Samsung confirms Galaxy S11 event for February 11th-The Verge</span>
                                    <span className="art-content">by Chris Welch</span>
                                </div>
                            </div>
                            <p className="art-time">2020-01-13</p>
                            <div className="big-imgShow">
                                <img src={require('../../../assets/images/one.jpg')} alt=""/>
                            </div>
                        </a>
                    </div>

                    <div className="news-block animated">
                        <a href="javascript:;" className="toLink">
                            <div className="row-article">
                                <div className="img-comp">
                                    <div className="img-show" style={showImage}></div>
                                </div>
                                <div className="art-comp" span={20}>
                                    <span className="art-title">Samsung confirms Galaxy S11 event for February 11th-The Verge</span>
                                    <span className="art-content">by Chris Welch</span>
                                </div>
                            </div>
                            <p className="art-time">2020-01-13</p>
                        </a>
                    </div>

                    <div className="news-block animated adver">
                        <a href="javascript:;" className="toLink">
                            <img src={require('../../../assets/images/one.jpg')} alt=""/>
                        </a>
                    </div>  */}
                </div>
            </div>
        )
    }
}

export default CommonRecommand
