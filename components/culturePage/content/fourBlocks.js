import React, { Component } from 'react';
import { Card, Col } from 'antd';
import { Router, Route, Link, browserHistory } from 'react-router-dom';
import './public.scss';
import './fourBlocks.scss';
import Swiper from 'swiper/js/swiper.min.js';
import 'swiper/css/swiper.min.css';
import $ from 'jquery';
import "animate.css";
const { Meta } = Card;
const dateStyle = {
  fontSize: "11px",
  lineHeight: "20.8px",
  fontWeight: 500,
}
class FourBlocks extends Component {

    constructor() {
    super();
    this.state = {
      sub_news1: [],
      newArray: [],
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
    // this.setState({
    //   hover: !this.state.hover
    // })
//    this.state.hoverArray[index]=true;

  }
  fixTime = (newsList) => {
    let newsList2 = newsList.map((num,index,arr) => {
       console.log(num.updatedDate);
       num.updatedDate = num.updatedDate.split(',')[0];

      });

    return newsList2;


  }
  group(array, subGroupLength) {
      let index = 0;
      let newArray = [];
      while(index < array.length) {
          newArray.push(array.slice(index, index += subGroupLength));
      }
      return newArray;
  }

    loadData = ( ) => {  // 4 page data
      // get sub news
      var myFetchOptions = {
          method: 'GET'
        };
        console.log('1111');
        fetch(`https://api.americanmuslimtoday.net/amt-news/api/v1/news?page=1&pageSize=24&category=${this.props.subCategory}`, myFetchOptions)
     .then(res => res.json())
     .then(data => {
           let sectionNum = Math.ceil(data.pageSize/4);  // count how much sections do we have in one page

           let newArray = this.group(data.list, 4);
           console.log(newArray)
         this.setState({
           sub_news1: this.fixTime(data.list),
           newArray: newArray,
         });
       })

    }
    renderNewsList = (index) => {
      return this.state.newArray[index] && this.state.newArray[index].length > 0
          ?   this.state.newArray[index].map((newsItem, index) => (
            <Col md={12} lg={12} xl={12} xxl={12} key={index}>
                <Link to={`details/${newsItem.newsId}`}  target="_blank" className="card-link">
                    <Card
                        style = {{"backgroundColor": this.state.hoverArray[index]? (this.props.hoverColor? this.props.hoverColor:"lightblue") :"unset"}}
                        className="card-module"
                        hoverable
                        onMouseEnter={this.toggleHover.bind(this,index)}
                        onMouseLeave={this.toggleHover.bind(this,index)}
                        cover={
                            <div className="img-back" style={{backgroundImage:  'url(' + newsItem.bannerImage + ')'}}></div>
                        }
                    >
                        <div className="card-text">

                            <a href="#" className="button">{newsItem.headline}</a>
                            <p className="top">
                                <span>{newsItem.author}</span>
                                <span style={dateStyle}>{newsItem.updatedDate}</span>
                            </p>
                        </div>
                    </Card>
                </Link>

            </Col>
          ))
          :  'We are loading news... Please click the category to see news here ';
        }
    componentDidMount() {
      let swiper = new Swiper('.swiper-center-module', {
              autoplay: false,
              loop: false,  // if want loop true, then the swiper should be open in componentDidUpdate
              navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
              },
              observer:true,//修改swiper自己或子元素时，自动初始化swiper
              observeParents:true,//修改swiper的父元素时，自动初始化swiper


          })

      let sub_news = []
      sub_news = this.loadData();
      // this.loadData("sub_news2");
      // this.loadData("sub_news3");
      // this.loadData("sub_news4");
    }
    componentDidUpdate(){

        // let swiper = new Swiper('.swiper-center-module', {
        //         autoplay:false, //等同于以下设置
        //         navigation: {
        //             nextEl: '.swiper-button-next',
        //             prevEl: '.swiper-button-prev',
        //         },
        //         observer:true,//修改swiper自己或子元素时，自动初始化swiper
        //         observeParents:true,//修改swiper的父元素时，自动初始化swiper
        //     })

    }


    render() {

        const { sub_news1} = this.state;

        console.log(this.state.hoverArray)


        return (
               <div style={{position: "relative"}}>
                    <div className="swiper-center-module swiper-container animated">
                        <div className="swiper-wrapper">
                        { this.state.newArray &&
                          this.state.newArray.map((newsItem,index)=>{
                            return (
                              <div className="swiper-slide">
                                   {this.renderNewsList(index)}
                               </div>
                            )
                          })
                        }
                        </div>

                    </div>
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                </div>
        )
    }
}

export default FourBlocks
