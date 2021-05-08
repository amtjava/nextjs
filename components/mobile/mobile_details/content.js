import './content.scss';
import { Rate } from 'antd';
import Swiper from 'swiper/js/swiper.min.js';
import 'swiper/css/swiper.min.css';
import React from 'react';
import { Table } from 'antd';



class Content extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        adv1:[],
        dataArr: [],
        newsItem:[],
        images:[],
        firstImage:{},
        workingHours:
          [ {openingTime: "Fixed Off", closingTime: "Fixed Off"},
            {openingTime: "Fixed Off", closingTime: "Fixed Off"},
            {openingTime: "Fixed Off", closingTime: "Fixed Off"},
            {openingTime: "Fixed Off", closingTime: "Fixed Off"},
            {openingTime: "Fixed Off", closingTime: "Fixed Off"},
            {openingTime: "Fixed Off", closingTime: "Fixed Off"},
            {openingTime: "Fixed Off", closingTime: "Fixed Off"},
          ],
         classifiedSocialMediaList: [],

      };


  }
  createMarkup() {
    return {__html: this.state.newsItem.description};
  };
  mediaOrder(socialList){
    console.log(socialList);
    let new_socialList= [];
    socialList.forEach((item,index) => {
      if(item.type=='TWITTER'){  new_socialList[0] = item  }
      if(item.type=='INSTAGRAM'){  new_socialList[1] = item  }
      if(item.type=='GOOGLE'){  new_socialList[2] = item  }
      if(item.type=='FACEBOOK'){  new_socialList[3] = item  }
    })
    console.log(new_socialList)
    return new_socialList;
  }
  workingHourOrder(hourList){
    let new_hourList = [];
    new_hourList= {...this.state.workingHours}

    hourList.forEach((item,index) => {
      console.log(`${index}---${item.openingTime}`)
      if(item.day=='MONDAY'){  new_hourList[0] = item  }
      if(item.day=='TUESDAY'){  new_hourList[1] = item  }
      if(item.day=='WEDNESDAY'){  new_hourList[2] = item  }
      if(item.day=='THURSDAY'){  new_hourList[3] = item  }
      if(item.day=='FRIDAY'){  new_hourList[4] = item  }
      if(item.day=='SATURDAY'){  new_hourList[5] = item  }
      if(item.day=='SUNDAY'){  new_hourList[6] = item  }

    })
    return new_hourList;
  }
      componentDidMount() {
        var myFetchOptions = {
          method: 'GET',
          headers:{
            "Content-Type":"application/json",
             'Authorization': 'Bearer '+ localStorage.usertocken

          },
        };
        fetch(`https://api.americanmuslimtoday.net/amt-news/api/v1/classifieds/${this.props.classifiedId}`, myFetchOptions)
          .then(response => response.json()).then(json => {
          console.log(json.classifiedSocialMediaList);
          if (json.classifiedImages){   // 先看是不是获取数据成功 如果没获取成功数据就不做  //空数组在布尔判断时还是true
              (json.classifiedBusinessHoursList.length>0) && this.setState({
              workingHours:  this.workingHourOrder(json.classifiedBusinessHoursList)
            });
            (json.classifiedSocialMediaList.length>0) && this.setState({
              classifiedSocialMediaList:  this.mediaOrder(json.classifiedSocialMediaList)
          });

            if (json.classifiedImages.length==0){
              this.setState({
                firstImage:"https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/619/cached.offlinehbpl.hbpl.co.uk/news/OMC/NikeMuslim-20180124014618716.jpg",
                newsItem: json,
              });

            }
            else{
              this.setState({
                newsItem: json,
                images: json.classifiedImages,
                firstImage: json.classifiedImages[0].image,
              });

            }


          }
          else {
            return false
          }

          document.title = this.state.newsItem.title + "-American Musilum Classified Detail-";
        });



              // 广告
              var myFetchOptions = {  //广告     0f484831-2031-450e-8173-3f470290f28a
            method: 'GET'
            };
            fetch("https://api.americanmuslimtoday.net/amt-news/api/v1/news?page=1&category=c585a939-2be3-4f7c-969b-402cac7713c9", myFetchOptions)
            .then(response => response.json())
            .then(json => this.setState({adv1: json.list}));

        let mySwiper = new Swiper('.picSwiper',{
            autoplay: true,

          //  loop: true,
        //    delay: 100,
        //    speed: 700,
        //    centeredSlides: false,       //为true设置模块居中
        //    spaceBetween : 20,          //slide之间的距离
        //    slidesOffsetBefore: 50,     //设定slides与wrapper左边框的偏移量
        //    slidesOffsetAfter: 50,      //设定slides与wrapper右边框的偏移量
            slidesPerView : '1',
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
       observeParents:true,//修改swiper的父元素时，自动初始化swiper
       pagination: {
           el: '.swiper-pagination',
       }


          });
          mySwiper.el.onmouseout = function(){
            mySwiper.autoplay.start();
          }
      }


  render(){


                  const columns = [
                    {
                      title: 'Day',
                      dataIndex: 'day',
                    },
                    {
                      title: 'Start_time',
                      dataIndex: 'start_time',
                    },
                    {
                      title: 'End_time',
                      dataIndex: 'end_time',
                    },
                  ];
                  const data = [
                    {
                      key: '1',
                      day: 'Monday',
                      start_time: '9:00 AM',
                      end_time: '5:00 PM',
                    },
                    {
                      key: '2',
                      day: 'Tuesday',
                      start_time: '9:00 AM',
                      end_time: '5:00 PM',
                    },
                    {
                      key: '3',
                      day: 'Thursday',
                      start_time: '9:00 AM',
                      end_time: '5:00 PM',
                    },
                  ];

          const {adv1} = this.state
          const adv_swiper = adv1.length
              ? adv1.map((newsItem, index) => (
                <div key={index} className="swiper-slide">

                          <img src={newsItem.bannerImage}/>

                </div>


              ))
              : 'We are loading news...';

      return (

          <div className="restanurant-content">

          <div  className="r-item-content scale-1px" style={{marginTop:"12px"}}>
              <div className="img-block">
              <img className="item-img" src="https://media.npr.org/assets/img/2018/04/10/img_7956_custom-849c7a5f39ee9dec9272abb40fa1d41a53774924-s2500-c85.jpg" />
              </div>
              <div className="item-info-content">
                  <div className="item-firstline">
                  <p className="item-title">{this.state.newsItem.title}</p> <Rate disabled defaultValue={5} className="star" />
                  </div>
                  <div className="item-desc clearfix">
                  {this.state.newsItem.classifiedSubCategory &&
    (<div className="item-score"> {this.state.newsItem.classifiedSubCategory.subCategory} </div>) }
                      <div className="item-count"></div>
              {this.state.newsItem.state && <div className="item-distance">{this.state.newsItem.state.name}</div>  }
              {this.state.newsItem.city && <div className="item-time">{this.state.newsItem.city.name}</div>  }
                  </div>
                  <div className="item-price">
                      <div className="item-pre-price"> {this.state.newsItem.streetAddress}</div>
                      <div className="item-meituan-flag">{this.state.newsItem.email}</div>
                  </div>
                  <div className="item-others">

                        <div className="other-content">item.info</div>
                  </div>
              </div>
          </div>



        <div className="restanurant-basic">
            <div className="restanurant-tel res-section">{this.state.newsItem.phoneNumber}</div>
            <div className="restanurant-addr res-section">
                <div className="addr-wrap">
                    <div className="addr-name">business address：</div>
                    <div className="addr-text"> {this.state.newsItem.streetAddress}</div>
                </div>
            </div>
        </div>
        <div className="restanurant-basic">
            <p className="restanurant-send-type res-section">Email：{this.state.newsItem.email}</p>
            <p className=" restanurant-send-time res-section">Social Media:<span className="meituan-send">

            <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-facebook"></use>
            </svg>
            <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icon-twitter"></use>
            </svg>
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-githair-instagram"></use>
            </svg>


            </span></p>
        </div>
        <div className="restanurant-basic">
          <p className="restanurant-pay-type res-section"  dangerouslySetInnerHTML={this.createMarkup()}>

          </p>



        </div>

        <div className="swiper-container picSwiper">
            <div className="swiper-wrapper">

                {adv_swiper}

            </div>
            <div className="swiper-pagination"></div>
        </div>

        <div>

         <h4>Working time</h4>
         <Table columns={columns} dataSource={data} size="small" />
        </div>
    </div>

      );
  }
}


export default Content;
