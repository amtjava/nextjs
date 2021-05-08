import React, { Component } from 'react';
import { Card } from 'antd';
import './left.scss';
import $ from 'jquery';
import "animate.css";
import LeftBlocks from '@/components/pc/culturePage/content/leftBlocks.js';
class Left extends Component {
  constructor() {
  super();
  this.state = {

  };
}
    componentDidMount() {



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
        const {sub_news} = this.state;

        return (
            <div className="left-module other-left-module">
                {/* <div className="module-title animated">
                    <span className="title-text">Art </span>
                </div>
                <div className="news-module" style={{marginTop: '5px'}}>
                    <LeftBlocks categoryId="d7a3de57-5cb3-425a-afa7-1523c182e1b5" hoverColor={"lightblue"}/>

                </div> */}
                <div className="module-title animated">
                    <span className="title-text">Art & Decor</span>
                </div>
                <div className="news-module" style={{marginTop: '5px'}}>
                    <LeftBlocks categoryId="d7a3de57-5cb3-425a-afa7-1523c182e1b5" hoverColor={"lightgrey"}/>


                </div>




            </div>
        )
    }
}

export default Left
