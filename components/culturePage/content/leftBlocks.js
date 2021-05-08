import React, { Component } from 'react';
import { Card, Col } from 'antd';
import './public.scss';
import { Router, Route, Link, browserHistory } from 'react-router-dom';
import './leftBlocks.scss';
import Swiper from 'swiper/js/swiper.min.js';
import 'swiper/css/swiper.min.css';
import $ from 'jquery';
import "animate.css";
import { Row } from '@/../node_modules/antd/lib/index';
const { Meta } = Card;

class LeftBlocks extends Component {
    constructor() {
    super();
    this.state = {
      news: [],

      hoverArray: [false,false,false,false],  // record which block in the 4 blocks is hover
    };
  }
  toggleHover = (index) => {
   let arr = this.state.hoverArray;  //this is low copy , arr and hoverarray will point to one address . so they will be changed togatehr

//    let arr = [...this.state.hoverArray]    // this is deep copy  we set a new arr, new address for it.  juts put the hoverarray into it. they will be changed deperately
    arr[index] = !arr[index];
    this.setState({
      hoverArray:arr
    })
  }



    componentDidMount() {
      // get sub news
      var myFetchOptions = {
          method: 'GET'
        };
        console.log('1111');
        fetch(`https://api.americanmuslimtoday.net/amt-news/api/v1/news?page=1&pageSize=6&category=${this.props.categoryId}`, myFetchOptions)
     .then(res => res.json())
     .then(data => {
         this.setState({
           news: data.list
         });
       })

    }
    componentDidUpdate(prevProps,prevState){

              let num = 0,
                  topArr = [];

              $(".left-module").find(".animated").each(function(){
                  topArr.push($(this).offset().top - $(window).height() + 75);
                  // 默认展示小于屏幕高度的
                  if ($(this).offset().top < $(window).height()) {
                      $(this).addClass('fadeInLeft');
                  }
              });

              $(window).scroll(res => {
                  if(num < topArr.length && $(window).scrollTop() > topArr[num]){
                      $(".left-module").find(".animated").eq(num).addClass('fadeInLeft');
                      num += 1;
                  }
              })

        }



        render() {
            const {news} = this.state;
            const newsList = news.length
                ? news.map((newsItem, index) => (

                  <Link to={`details/${newsItem.newsId}`}  target="_blank" className="card-link animated">
                      <Card
                          className="card-module"
                          style = {{"backgroundColor": this.state.hoverArray[index]? (this.props.hoverColor? this.props.hoverColor:"lightblue") :"unset"}}
                          hoverable
                          onMouseEnter={this.toggleHover.bind(this,index)}
                          onMouseLeave={this.toggleHover.bind(this,index)}
                          cover={
                                <div className="img-back" style={{backgroundImage:  'url(' + newsItem.bannerImage + ')'}}></div>
                          }
                      >
                          <div className="card-text">
                              <p className="top">
                                  <span>{newsItem.updatedDate}</span>
                                  <span>{newsItem.author}</span>
                              </p>
                              <a href="#" className="button">{newsItem.headline}</a>
                          </div>
                      </Card>
                  </Link>

                ))
                :  'We are loading news... Please click the category to see news here ';
        return (
          <div className="left-news-module">
              {newsList}
          </div>

        )
    }
}

export default LeftBlocks
