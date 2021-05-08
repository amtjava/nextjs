import React, { Component, Fragments } from "react";
import $ from 'jquery';
import Swiper from 'swiper/js/swiper.min.js';
import "animate.css";
import { Carousel, WingBlank, Button } from 'antd-mobile';
import { Tabs, WhiteSpace } from 'antd-mobile';
import style2 from './news.module.scss'
import './style.scss';
import { Router, Route, Link, browserHistory } from 'react-router-dom';
import { StickyContainer, Sticky } from 'react-sticky';
import { withRouter } from 'react-router-dom';
function renderTabBar(props) {
return (
  <Sticky>
{({
  style

}) => (

<div
  style={{
    ...style,
                     zIndex: 1,

                     'top': '48px',
                     'border-radius':'8px',
                     'box-shadow': '0px 6px 15px 0px rgba(91, 145, 232, 0.12)',
                     'font-weight': '500'


  }}
  > <Tabs.DefaultTabBar {...props} page={4}/>
  </div>

)}
</Sticky>
);
};

class NewsList extends Component {

  constructor() {
  super();
  this.state = {
    news: [],
    headline_news:[],
    type: '111',
    repoName:'',
    repoUrl:'',
    page:1,
    more_news:true,
    adv1:[],
    imgHeight: 176,
    isButtonLoading: false,


	 category:[
   {
         "categoryId": "eee28bea-3432-4326-9e3c-6a4765da3768",
         "category": "News",
         "icon": "https://media.wsls.com/photo/2017/04/24/Whats%20News%20Today_1493062809311_9576980_ver1.0_1280_720.png"
   },
   {
        "categoryId": "f70b035d-c105-48c9-a76e-41b7a87a2518",
        "category": "Opinion"
    },

    {
        "categoryId": "7c80d75b-6b17-40d7-a8cf-5d47bfd6bdc7",
        "category": "Legal",
        "icon": "https://tse1.mm.bing.net/th?id=OIP.2RPAAurmQB6HMvKokPuoKAHaIK&pid=Api&P=0&w=300&h=300"
    },
    {
        "categoryId": "23aca6d4-b740-47c4-b30b-8f16ef8bdeff",
        "category": "Health",
        "icon": "https://hhp-blog.s3.amazonaws.com/2018/02/iStock-639896942.jpg"
    },
    {
        "categoryId": "4009ff3f-3539-4aaa-a29d-2f46920c87b6",
        "category": "Faith",
        "icon": "https://previews.123rf.com/images/bloom21/bloom211903/bloom21190300057/120929017-typography-word-faith-starts-an-ends-with-arrow.jpg"
    },
    {
        "categoryId": "b56838ae-689a-4464-9c77-9a59c9115ca7",
        "category": "Women",
        "icon": "https://amt-news.s3.us-east-2.amazonaws.com/dev/media/category/icon/TVRVNU5qVTNNRGszTkRFeE9BPT0=.jpeg"
    },
    {
        "categoryId": "a5d376d2-70de-42aa-8f7b-fbd05feaeec8",
        "category": "Youth",
        "icon": "https://images.sadhguru.org/sites/default/files/media_files/iso/en/57758-youth-faith-and-belief.jpg"
    },
    {
         "categoryId": "donate",
         "category": "Donate"
     },
    {
        "categoryId": "c505c416-1ad7-4b49-be55-3912e0e8d96e",
        "category": "Life",
        "icon": "https://amt-news.s3.us-east-2.amazonaws.com/dev/media/category/icon/TVRVNU5qVTNNVGc1TVRFeE9RPT0=.jpeg"
    },
    {
        "categoryId": "5e7ecc1b-e63d-497a-b646-7706dc3f4545",
        "category": "Culture",
        "icon": "https://static1.squarespace.com/static/550ab440e4b0bb7b11b3fa60/550b0a06e4b0a6795c1e9f0c/5c9c83a0d6afab00018c9f4a/1569409173057/Culture.jpg?format=1500w"
    },
],
   currentTab:0,   // same as tab means  which cateogry it is now, 1 is Legal ...
   currentPage:1,
  };
}

componentWillMount() {
  // first get first tab news data

  var myFetchOptions = {
      method: 'GET'
    };
    console.log('1111');
    fetch(`https://api.americanmuslimtoday.net/amt-news/api/v1/news/list?page=1&category=${this.state.category[this.state.currentTab].categoryId}`, myFetchOptions)
 .then(res => res.json())
 .then(data => {
     console.log(data.list[0])
     this.setState({
       news: data.list,
       headline_news: data.list[0]
     });
   })
 .catch(error => {
   this.setState({
     isLoaded: true,
     error
   });
 })
// second  load all category
// var myFetchOptions = {
//   method: 'GET'
// };
// fetch("https://api.americanmuslimtoday.net/amt-news/api/v1/news/categories?showAllCategories=false&timezone=Australia/Brisbane", myFetchOptions)
// .then(response => response.json())
// .then(json => {
//   var tmp_list = json;
//
//   for (var i=0 ; i < tmp_list.length; i++){
//     if (tmp_list[i].category=="Advertisement1"){
//        tmp_list.splice(i,1);
//     }
//     if (tmp_list[i].category=="Advertisement2"){
//        tmp_list.splice(i,1);
//     }
//     if (tmp_list[i].category=="Advertisement3"){
//        tmp_list.splice(i,1);
//     }
//     if (tmp_list[i].category=="Logo-video"){
//        tmp_list.splice(i,1);
//     }
//       if (tmp_list[i].category=="Video"){
//          tmp_list.splice(i,1);
//       }
//     //  console.log(tmp_list)
//
//
//   }
//     tmp_list.reverse();
//   console.log(tmp_list)
//   this.setState({category: tmp_list})
// });





    }



    componentDidMount() {
      // 广告
      var myFetchOptions = {  //广告     0f484831-2031-450e-8173-3f470290f28a
    method: 'GET'
    };
    fetch("https://api.americanmuslimtoday.net/amt-news/api/v1/news/list?page=1&category=c585a939-2be3-4f7c-969b-402cac7713c9", myFetchOptions)
    .then(response => response.json())
    .then(json => this.setState({adv1: json.list}));





    }






    onTabClick(tab, index){  // when catrgory change
      this.setState({
// 这里我们不需要将news全部清空 跟pc端不一样 因为模板里对应不同的classname的eq（num）     news:''
        currentTab: tab,
        currentPage:1,


    })
    if (tab==7){  // donate link

      this.props.history.push("/donate");
      return 0;
    }


      // first get first tab news data
      var myFetchOptions = {
          method: 'GET'
        };
        console.log(this.state.category[tab].categoryId);
        fetch(`https://api.americanmuslimtoday.net/amt-news/api/v1/news/list?page=1&category=${this.state.category[tab].categoryId}` , myFetchOptions)
     .then(res => res.json())
     .then(data => {

         this.setState({
           news: data.list,
           headline_news: data.list[0]
         });
       })
     .catch(error => {
       this.setState({
         isLoaded: true,
         error
       });
     })






    }
    onChange(tab, index){


    }
    handleLoadmore = () => {
      this.setState({
        isButtonLoading:true,
      })
      var myFetchOptions = {
            method: 'GET'
          };
          fetch(`https://api.americanmuslimtoday.net/amt-news/api/v1/news/list?page=${this.state.currentPage + 1}&category=${this.state.category[this.state.currentTab].categoryId}`, myFetchOptions)
    //      fetch("https://api.americanmuslimtoday.net/amt-news/api/v1/classifieds?classifiedSubCategory=43800d11-af05-440a-90b6-3fbaa8407976", myFetchOptions)
          .then(response =>
            {
               return response.json();
            }
          )
          .then(json =>
            { // let totalCount = parseInt(json.totalCount / json.pageSize) +1 ;  This is counting for page, but antd already done this so dont need.
                let new_list=json.list;
                json.list && this.setState({
                  isButtonLoading:false,

                  currentPage: this.state.currentPage + 1 ,
                  news: [...this.state.news,...new_list],   // [...arr] is the copy
                });
              }
          );


    }

    //动画  //tab传入这个第几个种类

    scrollAnimate(tab) {
        let num = 0, topArr = [],
            numtwo = 0, toptwoArr = [],
            numthree = 0, topthreeArr = [];

            $(`.${style2.newsbox}`).eq(tab).find(".newslist").each(function(){
                topArr.push($(this).offset().top + 50);
            });   // news_newsbox__Kh9e3 是scss编译后的classname eq就是选中第几个 加动画
            console.log(topArr)
            for(let i = 0; i < topArr.length; i++){   // z这里先算出已经有多少行应该显示出来   后面再根据scroll动态表达
              // z这里先算出已经有多少行应该显示出来   后面再根据scroll动态表达  //这边略有修改淘宝代码 因为用户可能再
                //再页面中间换分类就刷新 这个 时候要用户还没有滚动就展示应该存在当时页面的新闻因此先渲染出来
                if(num < topArr.length && ($(window).height() + $(window).scrollTop()) > topArr[num]){
                $(`.${style2.newsbox}`).eq(tab).find(".newslist").eq(num).addClass('fadeInUp');
                    num += 1;
                }
            }

        $(window).scroll(res => {     //后面再根据scroll动态表达
          //`.${style2.newsbox}` 这个是css预编译写成对象变量形式   避免其他组件样式污染
    //        console.log($(window).scrollTop());
    //         console.log($(window).height());
            if(num < topArr.length && ($(window).height() + $(window).scrollTop()) > topArr[num]){
              $(`.${style2.newsbox}`).eq(tab).find(".newslist").eq(num).addClass('fadeInUp');
                num += 1;
            }

        })
    }

        componentDidUpdate(prevProps,prevState){
          // let mySwiper = new Swiper('.adverSwiper',{
          //    autoplay: true,
          //     loop: true,
          //    delay: 100,
          //    speed: 700,
        //     centeredSlides: true,       //为true设置模块居中
          //    spaceBetween : 20,          //slide之间的距离
          //    slidesOffsetBefore: 50,     //设定slides与wrapper左边框的偏移量
          //    slidesOffsetAfter: 50,      //设定slides与wrapper右边框的偏移量
          //    slidesPerView : '2',
         //      observer:true,//修改swiper自己或子元素时，自动初始化swiper
         // observeParents:true//修改swiper的父元素时，自动初始化swiper
         //
         //
         //    });



          this.scrollAnimate(this.state.currentTab);

        }

    render(){
        const {category} = this.state
        let imgUrl = '/static/media/onePhoto.bb45fbbf.jpg';
        let showImage = {
            backgroundImage: 'url(' + imgUrl + ')'
        }
        let imgBack = <div className={style2.imgBack} style={showImage}></div>;


        const initial = 5
        const tabs = category.length
        ? category.map((newsItem,index) => (
              { title: newsItem.category }

        ))
        :   [
            { title: 'news1' },
            { title: 'news2' },
            { title: 'news3' },
        ];


        const {news} = this.state
        const {adv1} = this.state
        const adv_swiper = adv1.length
            ? adv1.map((newsItem, index) => (
              <div key={index} className="swiper-slide">

                  <img src={newsItem.bannerImage} style={{width:"100%",maxHeight:"200px",margin:"0 auto"}}/>

              </div>


            ))
            : 'We are loading news...';
        console.log(adv1);



// 先赋值每个种类的新闻list

        const newsList = news.length
    ? news.map((newsItem, index) => (
     <div className={[`${style2.newslist}`, 'animated newslist'].join(' ')} ref="newslist">
          <Link to={`details/${newsItem.newsId}`}  target="_blank" className={style2.alink}>
            {/* {imgBack}  */}
              <div className={style2.imgBack} style={{ "backgroundImage" : 'url(' + newsItem.bannerImage + ')' }}> </div>


              <div className={style2.textbox}>
                  <p className={style2.author}>{newsItem.headline}</p>
                  <p className={style2.content}>{newsItem.description}</p>
              </div>
          </Link>




     </div>


    ))
    :  'We are loading news...';

console.log(this.state.initialPage)

// 把整个模块都赋值

		const newsTabPane =  category.map((newsItem, index) => (
        <div style={{padding: '15px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'lightgrey' }}>
            <div className={style2.contentmodule}>
                <div id="newsboxOne" className={[`${style2.newsbox}`].join(' ')}>

                        {newsList}

                </div>
            </div>
        </div>



			))














        return (
          <div>
          {/*  <WhiteSpace />  */}
            <StickyContainer>

            <Tabs

                tabs={tabs}
                tabBarBackgroundColor={'rgba(224, 220, 220, 0.88)'}
                tabBarInactiveTextColor={'#000000'}
                tabBarActiveTextColor={'#1000ff'}
                tabBarTextStyle={{
                  fontWeight: '600',

                }}
            //    renderTabBar={props => <Tabs.DefaultTabBar {...props} page={4} />}
              //  initialPage={initial}
                  renderTabBar={renderTabBar}
                useOnPan={false}
                onTabClick={(tab, index) => this.onTabClick((tab, index))}
                onChange={(tab, index) => this.onTabClick((tab, index))}
            >
              {newsTabPane}

{/*
                <div style={{padding: '15px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                    <div className={style.contentmodule}>
                        <div id="newsboxOne" className={[`${style.newsbox}`].join(' ')}>

                                {newsList}

                        </div>
                    </div>
                </div>
                <div style={{padding: '15px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                    <div className={style.contentmodule}>
                        <div id="newsboxOne" className={[`${style.newsbox}`].join(' ')}>
                        {newsList}

                        </div>
                    </div>
                </div>
                <div style={{padding: '15px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                    <div className={style.contentmodule}>
                        <div id="newsboxOne" className={[`${style.newsbox}`].join(' ')}>
                        {newsList}

                        </div>
                    </div>
                </div>*/}

            </Tabs>

            </StickyContainer>
            <Button type="primary" loading={this.state.isButtonLoading} size="small" onClick={this.handleLoadmore.bind(this)} style={{color:"white",margin:"0 15px"}}>Click me to load more news ...</Button>
            <WhiteSpace />
          </div>
        )
    }
}


export default withRouter(NewsList);
