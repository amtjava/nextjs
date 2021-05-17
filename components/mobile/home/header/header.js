import React, { Component } from 'react';
import $ from 'jquery';
import style from './header.module.scss';
import Image from 'next/image'
import { Router, Route, Link, browserHistory } from 'react-router-dom';
class Header extends Component {
    constructor(){
        super();
        this.state = {
            isOpen: false,
            hasLogined: false,
        }
    }
    logout(){
      localStorage.userid= '';
      localStorage.usertocken = '';
      localStorage.userNickName= '';
      this.setState({hasLogined:false});
    };

    menuToggle = () => {
        this.setState(state => ({
            isOpen: !state.isOpen
        }))
    }
    componentDidMount() {
      console.log(localStorage.usertocken);
      // 判断是否已经登陆
      if (localStorage.userid!=undefined && localStorage.userid!='') {
          this.setState({hasLogined:true});
        }
    }

    render() {
      const userShow = localStorage.usertocken?

      <div className={[`menulist`, 'headerMenubox'].join(' ')} style={this.state.isOpen == true ? {display: "block"} : {display: "none"}}>

          <a href={`/profile`} className="menu" onClick={this.menuToggle}>
              <span>{localStorage.userNickName}</span>
          </a>

          <a href={`/login`} className="menu" onClick={this.logout.bind(this)}>
            <span>sign out</span>
          </a>

          <a href={`/donate`} className="menu">
            <span>Donate AMT</span>
          </a>

          <a href={`/searchpage`} className="menu">
            <span>search news</span>
          </a>
      </div>

      :
      <div className={[`menulist`, 'headerMenubox'].join(' ')} style={this.state.isOpen == true ? {display: "block"} : {display: "none"}}>

          <a href={`/user/login`} className="menu" onClick={this.menuToggle}>
            <span>sign in</span>
          </a>
          <a href={`/user/login`} className="menu" onClick={this.menuToggle}>
            <span>sign up</span>
          </a>

          <a href={`/donate`} className="menu">
            <span>Donate AMT</span>
          </a>

          <a href={`/searchpage`} className="menu">
            <span>search news</span>
          </a>

      </div>





        return (
            <div id="header" className="mobileheader">
                <div className="logo">
                  <a href={`/`}>

                    < img src = "https://amt-news.s3.us-east-2.amazonaws.com/dev/media/news/banner_image/TVRZeU1USXlNalF6TmpjMU1BPT0=..png"
                    alt = ""
                    width = "262"
                    height = "61" / >

                  {/* <img src={require('assets/images/mobilelogo.png')}/> */}
                   </a>
                </div>

          {/*       <svg style={{width: 30,height: 30}} onClick={this.menuToggle}>
                    <use xlinkHref="#icon-more"></use>
                </svg>     */}

              <svg t="1582853770784" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6589" width="30" height="30" onClick={this.menuToggle}><path d="M512 986.156522c-267.130435 0-483.06087-215.930435-483.06087-483.06087S244.869565 22.26087 512 22.26087c264.904348 0 483.06087 215.930435 483.06087 483.06087S776.904348 986.156522 512 986.156522zM512 66.782609C271.582609 66.782609 73.46087 262.678261 73.46087 505.321739c0 240.417391 195.895652 436.313043 438.53913 436.313043 240.417391 0 438.53913-195.895652 438.53913-438.53913C950.53913 262.678261 752.417391 66.782609 512 66.782609zM763.547826 527.582609 260.452174 527.582609c-13.356522 0-22.26087-8.904348-22.26087-22.26087s8.904348-22.26087 22.26087-22.26087l503.095652 0c13.356522 0 22.26087 8.904348 22.26087 22.26087S774.678261 527.582609 763.547826 527.582609zM512 776.904348c-13.356522 0-22.26087-8.904348-22.26087-22.26087L489.73913 253.773913c0-13.356522 8.904348-22.26087 22.26087-22.26087 13.356522 0 22.26087 8.904348 22.26087 22.26087l0 503.095652C534.26087 768 525.356522 776.904348 512 776.904348z" p-id="6590" fill="#ffffff"></path></svg>

                {userShow}
            </div>
        )
    }
}

export default Header
