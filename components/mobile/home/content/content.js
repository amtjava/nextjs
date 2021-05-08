import React, { Component } from 'react';
import {Button} from 'antd';
import 'lib-flexible';
import style from './content.module.scss';
import Menu from '@/components/mobile/home/content/menuList/menu';
import Newslist from '@/components/mobile/home/content/newsList/news';
import Life from '@/components/mobile/home/content/lifemodule/life';
import { Router, Route, Link, browserHistory } from 'react-router-dom';

class Content extends Component {
  constructor(props){
      super(props);

      this.state = {
          category:[],

      }
  }
  componentDidMount() {
    // request for all category

    var myFetchOptions = {
  method: 'GET'
  };
  fetch("https://api.americanmuslimtoday.net/amt-news/api/v1/classifieds/categories", myFetchOptions)
  .then(response => response.json())
  .then(json => {
    let tmp_list = json;

    for (var i=0 ; i < tmp_list.length; i++){
      if (tmp_list[i].category=="Events" || tmp_list[i].category=="Scrollings"){
         tmp_list.splice(i,1);
      }

    }
  // console.log(tmp_list)

    this.setState({category: tmp_list})

  });


  }
    render() {
      const {category}=this.state;
      console.log(category)
      const category_list =  category.map((newsItem, index) => (
        <Link className="" to={`/classifiedlist/${newsItem.id}`}>
            <span> {newsItem.category} </span>
            <img src={newsItem.icon} />

        </Link>

    ))
        return (
            <div className={style.content} id="contentModule">

                <Newslist/>
            {/*    <Life/>  */}
                <Menu categoryList={this.state.category}/>

                <Button type="primary" size={"large"}>
                  <Link to={`/donate`}>
                    Doante American Muslim Today
                  </Link>
               </Button>


                <p className={style.title}>
                    <svg className={style.icon} aria-hidden="true" style={{width: 26,height: 21}}>
                        <use xlinkHref="#icon-shangjia"></use>
                    </svg>
                    AMT Classified
                </p>

                <div className={style.storemodule}>

                    {category_list}

                </div>
                <Menu categoryList={this.state.category}/>

            </div>
        )
    }
}

export default Content
