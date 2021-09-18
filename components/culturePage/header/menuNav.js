import React, { Component, Fragment } from 'react';
import style from './menuNav.module.scss';
import './nav_style.scss';
import Image from 'next/image'
import './index.scss';
import { Col, Menu, Dropdown, Button, Input, Modal, Tabs, message  } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import fbLogo from '../../../assets/images/fb-logo.png';
import googleLogo from '../../../assets/images/google-logo.png';
import $ from 'jquery';
import { withRouter } from 'react-router-dom';
import { Router, Route, Link, browserHistory } from 'react-router-dom';
import { Form,Icon} from '@ant-design/compatible';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
class MenuNav extends Component {
    constructor(props){
        super(props);
        this.state = {
          category: [],
            current: 'eee28bea-3432-4326-9e3c-6a4765da3768',  // 默认news
            usercurrentCondition: 'top',
            modalVisible: false,
            action: 'login',
            hasLogined: false,
            usertocken: '',
            userid: 0,
            userNickName:'test',
            focused: false,
            shadow:false,
            subCategories:{},
        }
    }
    toQueryString(obj) {
      return obj ? Object.keys(obj).sort().map(function (key) {
          var val = obj[key];
          if (Array.isArray(val)) {
              return val.sort().map(function (val2) {
                  return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
              }).join('&');
          }
          return encodeURIComponent(key) + '=' + encodeURIComponent(val);
      }).join('&') : '';
    };
    handleLogin(e) {  // when click login menu
      this.setModalVisible(true);
    }
    logout(){
      localStorage.userid= '';
      localStorage.usertocken = '';
      localStorage.userNickName= '';
      this.setState({hasLogined:false});
    };
    setModalVisible(value)
    {
      this.setState({modalVisible: value});
    };
    handleSubmit_login(e){
      e.preventDefault();
      let initHeaders = new Headers()
      initHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
  // 		body 数据，格式 key=val&key=val&key=val
      var formData = this.props.form.getFieldsValue();
    //    console.log(formData)
  //      console.log(formData.username)
      let body={
          "grant_type" : "password",
          "username": formData.username,
          "password": formData.password
        };
        body=this.toQueryString(body);
        var myFetchOptions = {
            method: 'POST',//
            headers:{
              "Content-Type":"application/x-www-form-urlencoded",
              "Authorization":"Basic YW10LWNsaWVudDphbXQtY2xpZW50LXNlY3JldA=="

            },
          body: body
      };
    //	console.log(typeof(myFetchOptions));
    //	console.log(formData);
      fetch("https://api.americanmuslimtoday.net/amt-news/oauth/token", myFetchOptions)
      .then(response => {
  //      console.log((response));
  //      console.log((response.status));
        if (response.status=="200") {
          message.success("login success!");
          Modal.success({
           content: 'login successfully',
         });
          this.setState({hasLogined:true});
          this.setModalVisible(false);
        }
        else {
          message.error("Please check your keyword and account email again");
          this.setState({hasLogined:false});
        }
        return response.json();
  //      console.log(response);
      })
      .then(json => {
  //      console.log(json);
  //      console.log(json.access_token);
        if (json.error_description){
  //        console.log(json.error_description);
          Modal.error({
               title: 'This is an error message',
               content: json.error_description,
             });
        //throw "network error";
        }
        if (json.access_token!="undefined"){
          this.setState({
            usertocken: json.access_token,
            userNickName: json.name,
            userid: json.userId
          });
        localStorage.userid= json.userId;
        localStorage.usertocken = json.access_token;
        localStorage.userNickName = json.name
        }
//      console.log(localStorage);
      })
      .catch(e => console.log(e));
    }

    handleSubmit_reg(e)
    {
      e.preventDefault();
      let initHeaders = new Headers()
      initHeaders.append('Content-Type', 'application/json')
  // 		body 数据，格式 key=val&key=val&key=val
      var formData = this.props.form.getFieldsValue();
    //  console.log(formData)
      let body={
          "name": formData.r_userName,
          "email":formData.r_userEmail,
        };
        //console.log(body);
      body = JSON.stringify(body, null, 2);
      var myFetchOptions = {
            method: 'POST',//
            headers:{
              "Content-Type":"application/json"
            },
          body
      };
      // console.log(myFetchOptions);
      // console.log(typeof(myFetchOptions));
      // console.log(formData);
      fetch("https://api.americanmuslimtoday.net/amt-news/api/v1/account", myFetchOptions)
      .then(response => {
  //      console.log((response.status));
        if (response.status=="201" || response.status=="204") {
          Modal.success({
           content: 'success, please check your email to verify',
         });
          message.success("success, please check your email to verify!");
            this.setModalVisible(false);
        }
        else {
          message.error("Please check your input again, or maybe change a new email address");
          return response.json()
        }


      })
      .then(json => {
//      json&&console.log(json);
      if (json){
//        console.log(json.errors[0].message);
        Modal.error({
             title: 'This is an error message',
             content: json.errors[0].message,
           });
      throw "network error";
      }

      //	this.setState({userNickName: json.name, userid: json.userId});
      //	localStorage.userid= json.userId;
      //	localStorage.usertocken = json.name;
      })
      .catch(e => console.log(e));
      if (this.state.action=="login") {
        this.setState({hasLogined:false});
      }
    //	message.success("请求成功！");
    };

    handleSubmit_forget = e => {
      e.preventDefault();
      let initHeaders = new Headers()
      initHeaders.append('Content-Type', 'application/json')
      var formData = this.props.form.getFieldsValue();
      let body={
          "email":formData.r_userEmail,
        };
        body = JSON.stringify(body, null, 2);
      var myFetchOptions = {
            method: 'POST',//
            headers:{
              "Content-Type":"application/json"
            },
          body
      };
      fetch("https://api.americanmuslimtoday.net/amt-news/api/v1/account/forgotPassword", myFetchOptions)
      .then(response => {
  //      console.log((response.status));
        if (response.status=="201" || response.status=="204") {
          Modal.success({
           content: 'success, please check your email to verify',
         });
          message.success("success, please check your email to verify!");
            this.setModalVisible(false);
        }
        else {
          message.error("Please check your input again, or maybe change a new email address");
          return response.json();
        }


      })
      .then(json => {
//      json&&console.log(json);
      if (json){
//        console.log(json.errors[0].message);
        Modal.error({
             title: 'This is an error message',
             content: json.errors[0].message,
           });
      throw "network error";
      }
      })
    }

    dropDownList = (category) => {
//      console.log(category)
      if (this.state.subCategories[category]) {
         return (
           this.state.subCategories[category].map((newsItem, index) => (
             <Menu.Item key={index} style={{ height:50, padding: "14px 10px" }} className={style.subMenu}>
              <a href="#" style={{fontSize: "17px" , fontWeight: 600, fontFamily: "TimesNewRoman, Times New Roman, Times, Baskerville, Georgia, serif" }}>{newsItem.category}</a>
             </Menu.Item>
        ))
      )
      }
      else {
          return 'We are loading news...';
      }
    }
    componentDidMount() {
      $( window ).scroll(function() {
  if($(this).scrollTop() > $('.header').height()) {
    $(".header").addClass("sticky")
  } else {
    $(".header").removeClass("sticky")
  }

});

      $(window).scroll(res => {
        // console.log($(window).scrollTop());

    //    var headerHeight = $(".header").height() + $(".header-nav").height() +$(".top-img-block").height() + parseInt($(".header").css('margin-bottom'));
        if($(window).scrollTop() > 310){
          $(".logo-img").css({
            height: '48px',
            width: '260px',
          })
          $(".small-title").css({
               display: 'none',
          });
        } else {
          $(".logo-img").css({
            height: '94px',
            width: '400px',
          })
          $(".small-title").css({

            display:"block",
          });
        }
      })
  //    console.log(localStorage.userid);
      // 判断是否已经登陆
      if (localStorage.userid!=undefined && localStorage.userid!='') {
  this.setState({hasLogined:true});
  this.setState({usertocken:localStorage.usertocken,userid:localStorage.userid,userNickName:localStorage.userNickName});
}
    var subCategories = { };

    // request for all category
    var myFetchOptions = {
      method: 'GET'
    };
    fetch("https://api.americanmuslimtoday.net/amt-news/api/v1/news/categories?showArchived=true", myFetchOptions)
    .then(response => response.json())
    .then(json => {
      let tmp_list = json;
          tmp_list = tmp_list.filter(function(item) {
           return item.category != "Advertisement3"
            });
          tmp_list = tmp_list.filter(function(item) {
             return item.category != "Advertisement2"
            });
          tmp_list = tmp_list.filter(function(item) {
               return item.category != "Advertisement1"
            });
            tmp_list = tmp_list.filter(function(item) {
              return item.category != "Video"
            });
  //    console.log(tmp_list);
      this.setState({category: tmp_list})  // ?
      return tmp_list })
      .then(tmp_list => {
        var that = this;
        tmp_list.map(function(item,index,arr){  // list all main category
          var myFetchOptions = {
            method: 'GET'
          };
          fetch(`https://api.americanmuslimtoday.net/amt-news/api/v1/news/categories/${item.categoryId}/subCategories`, myFetchOptions)
          .then(response => response.json())
          .then(json => {
              subCategories[item.category] = json;
      //        console.log(subCategories);
              (index == arr.length - 1) && that.setState({subCategories: subCategories})
          })

        });

  //      console.log(subCategories)
        return subCategories
    //    this.setState({subCategories: subCategories})
      })
      .then (subCategories => {
    //        console.log(subCategories)
          this.setState({subCategories: subCategories})
      })
      // const provinceData = ['Zhejiang', 'Jiangsu'];
      // const cityData = {
      //   Zhejiang: ['Hangzhou', 'Ningbo', 'Wenzhou'],
      //   Jiangsu: ['Nanjing', 'Suzhou', 'Zhenjiang'],
      // };

    //  this.setState({subCategories: subCategories})
    // 处理头部
            // this.timeoutId = setTimeout(() => {
            //   this.setState({
            //     userid:2,
            //   })
            // }, 2000)
            $(window).scroll(res => {
                if($(window).scrollTop() > 60){

                 this.setState({
                   shadow:true,
                 })
                }
                else {
                  this.setState({
                    shadow:false,
                  })
                }
            })


        }

    render() {
      const baseUrl = "https://americanmuslimtoday.com"
    const {subCategories} = this.state;
    const getFieldProps = this.props.form.getFieldProps;
//    console.log(subCategories); console.log(subCategories.Culture)
    const headerShadow= {
         boxShadow: this.state.shadow?'0 0 10px 0 rgba(0,0,0,.4)':'none'
  };
  const userShow = this.state.hasLogined
  ?
      <Dropdown style={{backgroundColor: "rgba(0, 0, 0, 0.65)"}} overlay={(
          // 菜单
          <Menu>
              <Menu.Item key="0">
                  <a href={`/profile`} >
                   My profile
                  </a>
              </Menu.Item>
              <Menu.Item key="1"  onClick={this.logout.bind(this)}>
                Logout
              </Menu.Item>
              <Menu.Item key="3">
                  <a href={`/classifiedhome`}>Create a classified </a>
              </Menu.Item>
          </Menu>
      )}>
          <Button style={{fontSize:"17px",fontWeight: 500}}  type="danger"  className="" onClick={e => e.preventDefault()}>
              {this.state.userNickName}
          </Button>
      </Dropdown >

  :

      <Dropdown style={{backgroundColor: "rgba(0, 0, 0, 0.65)"}} overlay={(
          // 菜单
          <Menu>
              <Menu.Item key="0" onClick={(e) => this.handleLogin(e) }>
                  Login
              </Menu.Item>
              <Menu.Item key="1" onClick={(e) => this.handleLogin(e) }>
                 Register
              </Menu.Item>
              <Menu.Item key="3" onClick={(e) => this.handleLogin(e) }>
                Forget Password
              </Menu.Item>
          </Menu>
      )}>
          <Button style={{fontSize:"17px",fontWeight: 500}}  type="danger"  className="" onClick={e => e.preventDefault()}>
            Login
    {/* <Link to={`/classifiedhome`} style={{fontSize: "20px" , fontWeight: 600}}> Login  </Link> */}
          </Button>
      </Dropdown >;



        return (
            <header className="headercontroller" style={headerShadow} >
              <div className="logo-content" style={{textAlign: 'center', marginBottom: '3px'}}>

                < img className = "logo-img"
                src = "https://amt-news.s3.us-east-2.amazonaws.com/dev/media/news/banner_image/TVRZeU1USXlNalF6TmpjMU1BPT0=..png"
                alt = ""
                width = "400"
                height = "94" / >
              </div>
              {/* <div className="small-title" style={{marginBottom: '8px'}}>
                <p style={{textAlign: 'center', color: 'white', fontFamily: 'Georgia,serif',fontStyle: 'italic', fontSize:"16px"}}>-Inspiring the Leaders of Tomorrow-</p>
              </div> */}
                <div className="headerbox" style={{textAlign: 'center'}}>
                    {/* <Col span={6} style={{}}>
                         <Link to={``}>
                        <div className={style.logo}>
                            <img src={require('../../../../assets/images/logo.png')} alt=""/>
                        </div>
                        </Link>
                    </Col> */}

                    <Col className="dropdownModule" span={24}>


                        {/* onClick={e => e.preventDefault() */}
                        <Button size="middle" type="link"   className={style.dropdownBtn} >
                          <a href={`/`}>   <Icon type="home" style={{fontSize: "20px", lineHeight:"20px",position:"relative",top:"-3px"}} /> </a>
                        </Button>
                    {/*    <Dropdown
                            className={style.dropdownBtn}
                            overlay={(
                                // 菜单
                                <Menu style={{ width: 150 }} >
                                      {this.dropDownList("Opinion")}
                                </Menu>
                            )}
                            trigger={['hover']}

                        >
                            <Button size="middle" type="link" className="" onClick={e => e.preventDefault()}>
                                  <Link to={`/opinion-page`} style={{fontSize:"17px",fontWeight: 500 , lineHeight:"20px", fontFamily: "TimesNewRoman, Times New Roman, Times, Baskerville, Georgia, serif"}}> Opinion <DownOutlined style={{fontSize:'8px'}}/>  </Link>
                            </Button>
                        </Dropdown>  */}
                        <Button size="middle" type="link"   className="dropdownBtn">
                              <a href={`/opinion-page`} style={{fontSize:"17px",fontWeight: 500 , lineHeight:"20px", fontFamily: "TimesNewRoman, Times New Roman, Times, Baskerville, Georgia, serif"}}> Opinion <DownOutlined style={{fontSize:'8px'}}/>  </a>
                        </Button>
                    {/*   <Dropdown
                            className={style.dropdownBtn}
                            overlay={(
                            // 菜单
                            <Menu style={{ width: 150 }} >
                                  {this.dropDownList("Legal")}
                            </Menu>
                                      )}
                          trigger={['hover']}

                                      >
                            <Button size="middle" type="link" onClick={e => e.preventDefault()}>
                                  <Link to={`/other-page/legal`} style={{   fontSize: "17px", fontWeight: 500 , lineHeight:"20px", fontFamily: "TimesNewRoman, Times New Roman, Times, Baskerville, Georgia, serif" }}> Legal <DownOutlined style={{fontSize:'8px'}}/> </Link>
                            </Button>
                        </Dropdown> */}
                        <Button size="middle" type="link"  className="dropdownBtn" >
                            <a href={`/other-page/legal`} style={{   fontSize: "17px", fontWeight: 500 , lineHeight:"20px", fontFamily: "TimesNewRoman, Times New Roman, Times, Baskerville, Georgia, serif" }}> Legal <DownOutlined style={{fontSize:'8px'}}/> </a>
                        </Button>

                    {/*         <Dropdown
                            className={style.dropdownBtn}
                            overlay={(
                                // 菜单
                                <Menu style={{ width: 150 }} >
                                    {this.dropDownList("Health")}
                                </Menu>
                            )}
                            trigger={['hover']}

                        >
                            <Button size="middle" type="link" className="" onClick={e => e.preventDefault()}>
                                  <Link to={`/other-page/health`} style={{fontSize:"17px",fontWeight: 500, lineHeight:"20px", fontFamily: "TimesNewRoman, Times New Roman, Times, Baskerville, Georgia, serif"}}> Health <DownOutlined style={{fontSize:'8px'}}/>  </Link>

                            </Button>
                        </Dropdown> */}
                        <Button size="middle" type="link"  className="dropdownBtn" >
                              <a href={`/other-page/health`} style={{fontSize:"17px",fontWeight: 500, lineHeight:"20px", fontFamily: "TimesNewRoman, Times New Roman, Times, Baskerville, Georgia, serif"}}> Health <DownOutlined style={{fontSize:'8px'}}/>  </a>

                        </Button>
                     {/*     <Dropdown
                            className={style.dropdownBtn}
                            overlay={(
                                // 菜单
                                <Menu style={{ width: 150 }} >
                                    {this.dropDownList("Faith")}
                                </Menu>
                            )}
                            trigger={['hover']}

                        >

                            <Button size="middle" type="link" className="" onClick={e => e.preventDefault()}>
                                   <Link to={`/other-page/faith`} style={{fontSize:"17px",fontWeight: 500, lineHeight:"20px", fontFamily: "TimesNewRoman, Times New Roman, Times, Baskerville, Georgia, serif"}} > Faith <DownOutlined style={{fontSize:'8px'}}/>  </Link>
                            </Button>

                        </Dropdown> */}
                        <Button size="middle" type="link" className="dropdownBtn"  >
                               <a href={`/other-page/faith`} style={{fontSize:"17px",fontWeight: 500, lineHeight:"20px", fontFamily: "TimesNewRoman, Times New Roman, Times, Baskerville, Georgia, serif"}} > Faith <DownOutlined style={{fontSize:'8px'}}/>  </a>
                        </Button>
                {/*          <Dropdown
                            className={style.dropdownBtn}
                            overlay={(
                                // 菜单
                                <Menu style={{ width: 150 }} >
                                    {this.dropDownList("Women")}
                                </Menu>
                            )}
                            trigger={['hover']}

                        >

                            <Button size="middle" type="link" className="" onClick={e => e.preventDefault()}>
                                   <Link to={`/other-page/women`} style={{fontSize:"17px",fontWeight: 500, lineHeight:"20px", fontFamily: "TimesNewRoman, Times New Roman, Times, Baskerville, Georgia, serif"}} > Women <DownOutlined style={{fontSize:'8px'}}/>  </Link>
                            </Button>

                        </Dropdown> */}
                        <Button size="middle" type="link" className="dropdownBtn">
                               <a href={`/other-page/women`} style={{fontSize:"17px",fontWeight: 500, lineHeight:"20px", fontFamily: "TimesNewRoman, Times New Roman, Times, Baskerville, Georgia, serif"}} > Women <DownOutlined style={{fontSize:'8px'}}/>  </a>
                        </Button>
                      {/*      <Dropdown
                              className={style.dropdownBtn}
                              overlay={(
                                    // 菜单
                                <Menu style={{ width: 150 }} >
                                      {this.dropDownList("Youth")}
                                </Menu>
                                  )}
                            trigger={['hover']}

                                  >
                              <Button size="middle" type="link" className="" onClick={e => e.preventDefault()}>
                                     <Link to={`/other-page/youth`} style={{fontSize:"17px",fontWeight: 500, lineHeight:"20px", fontFamily: "TimesNewRoman, Times New Roman, Times, Baskerville, Georgia, serif"}}> Youth <DownOutlined style={{fontSize:'8px'}}/>  </Link>
                              </Button>
                        </Dropdown> */}
                        <Button size="middle" type="link"  className="dropdownBtn" >
                              <a href to={`/other-page/youth`} style={{fontSize:"17px",fontWeight: 500, lineHeight:"20px", fontFamily: "TimesNewRoman, Times New Roman, Times, Baskerville, Georgia, serif"}}> Youth <DownOutlined style={{fontSize:'8px'}}/>  </a>
                        </Button>
                        <Dropdown
                              className="dropdownBtn"
                              overlay={(
                                    // 菜单
                                <Menu style={{ width: 185}} >
                                      {this.dropDownList("Life")}
                                </Menu>
                                  )}
                            trigger={['hover']}

                                  >
                              <Button size="middle" type="link" className="" >
                                     <a href={`/other-page/life`} style={{fontSize:"17px",fontWeight: 500, lineHeight:"20px", fontFamily: "TimesNewRoman, Times New Roman, Times, Baskerville, Georgia, serif"}}> Life <DownOutlined style={{fontSize:'8px'}}/>  </a>
                              </Button>
                        </Dropdown>

                        <Dropdown
                              className="dropdownBtn"
                              overlay={(
                                    // 菜单
                                <Menu style={{ width: 160 }} >
                                      {this.dropDownList("Culture")}
                                </Menu>
                                  )}
                            trigger={['hover']}

                                  >
                              <Button size="middle" type="link" className="">
                                  <a href={`/other-page/culture`} style={{fontSize:"17px",fontWeight: 500, lineHeight:"20px", fontFamily: "TimesNewRoman, Times New Roman, Times, Baskerville, Georgia, serif"}}> Culture <DownOutlined style={{fontSize:'8px'}}/>  </a>
                              </Button>
                        </Dropdown>

              {/*         <Dropdown
                            className={style.dropdownBtn}
                            overlay={(
                            // 菜单
                            <Menu style={{ width: 150 }} >
                                  {this.dropDownList("News")}
                            </Menu>
                                      )}
                          trigger={['hover']}

                                      >
                            <Button size="middle" type="link" className="" onClick={e => e.preventDefault()}>
                                  <Link to={`/classifiedhome`} style={{fontSize:"17px",fontWeight: 500, lineHeight:"20px", fontFamily: "TimesNewRoman, Times New Roman, Times, Baskerville, Georgia, serif"}}> Classified <DownOutlined style={{fontSize:'8px'}}/> </Link>
                            </Button>
                        </Dropdown>
                        */}
                        <Button size="middle" type="link"  className={style.dropdownBtn}  >
                            <a to={`/blog`} style={{fontSize:"17px",fontWeight: 500, lineHeight:"20px", fontFamily: "TimesNewRoman, Times New Roman, Times, Baskerville, Georgia, serif"}}>
                            Blog 
                            <DownOutlined style={{fontSize:'8px'}}/>
                            </a>
                        </Button>

                        <Button size="middle" type="link"  className="dropdownBtn"  >
                            <a href={`/donate`} style={{fontSize:"17px",fontWeight: 500, lineHeight:"20px", fontFamily: "TimesNewRoman, Times New Roman, Times, Baskerville, Georgia, serif"}}> Donate <DownOutlined style={{fontSize:'8px'}}/> </a>
                        </Button>
                        <Button size="middle" type="link"  className="dropdownBtn" >
                            <a href={`/classifiedhome`} style={{fontSize:"17px",fontWeight: 500, lineHeight:"20px", fontFamily: "TimesNewRoman, Times New Roman, Times, Baskerville, Georgia, serif"}}> Classified <DownOutlined style={{fontSize:'8px'}}/> </a>
                        </Button>
                        <Button size="middle" type="link"  className="dropdownBtn"  >
                            <a href={`/searchpage`} style={{display:"flex",alignItems:"center",fontSize:"17px",fontWeight: 500, lineHeight:"20px", fontFamily: "TimesNewRoman, Times New Roman, Times, Baskerville, Georgia, serif"}}>
                              <Icon type="search" />
                              <DownOutlined style={{fontSize:'8px'}}/> </a>
                        </Button>

                        {userShow}
                    </Col>


                </div>

                        {/*       // onCancel= {this.setModalVisible.bind(this,false)} this is same function as below   */}
                                	<Modal title="User Center" wrapClassName="vertical-center-modal" visible={this.state.modalVisible} onCancel= {() => this.setModalVisible(false)} onOk={() => this.setModalVisible(false)}
                                									footer={[
                                										null
                                									]}
                                									>
                                										<Tabs type="card">
                                											<TabPane tab="Login" key="1">
                                												<Form className="formTags"  onSubmit={this.handleSubmit_login.bind(this)} style={{marginBottom: '30px'}}>
                                											   <FormItem label= {<p style={{display:"inline-block",margin: 0}}>  <Icon style={{fontSize:"28px"}} type="mail" theme="twoTone" twoToneColor="#52c41a"/> Email</p>} >
                              {/*后台实际要的是email 但是给的接口字段却是username所以只好这样忽悠*/}
                               													  <Input type="text" placeholder="input your email" {...getFieldProps('username')}/>
                                												</FormItem>
                                												   <FormItem label= {<p style={{display:"inline-block",margin: 0}}>  <Icon style={{fontSize:"28px", color:'#08c'}} type="key" />Password </p>} >
                                														<Input type="password" placeholder="Enter your password" {...getFieldProps('password')}/>
                                													</FormItem>
                                													<Button type="primary" htmlType="submit">Log In</Button>
                                												</Form>
                                                        <div className="line" style={{marginBottom: '20px', lineHeight: '1px', borderLeft: '200px solid #e0e0e0', borderRight: '200px solid #e0e0e0', textAlign: 'center'}}>or</div>
                                                        <div className="social-button" style={{textAlign: 'center'}}>
                                                          <a href={baseUrl+"/sociallogin"} style={{marginRight: '30PX'}}><img src={googleLogo} alt="Google" style={{width: '40px', height: '40px'}}/></a>
                                                          <a href={baseUrl+"/sociallogin"} style={{marginLeft: '30PX'}}><img src={fbLogo} alt="Facebook" style={{width: '28px', height: '28px'}}/></a>
                                                        </div>
                                											</TabPane>
                                											<TabPane tab="Register" key="2">
                                												<Form className="formTags" onSubmit={this.handleSubmit_reg.bind(this)}>
                                													  <FormItem label= {<p style={{display:"inline-block",margin: 0}}>  <Icon style={{fontSize:"28px", color:'#08c'}} type="user"/> UserName</p>} >
                                														<Input placeholder="Enter your username" {...getFieldProps('r_userName')}/>
                                													</FormItem>
                                													<FormItem label= {<p style={{display:"inline-block",margin: 0}}>  <Icon style={{fontSize:"28px"}} type="mail" theme="twoTone" twoToneColor="#52c41a"/> Email</p>} >
                                														<Input placeholder="Enter your email" {...getFieldProps('r_userEmail')}/>
                                													</FormItem>
                                													<Button type="primary" htmlType="submit">Register</Button>
                                												</Form>
                                											</TabPane>
                                                      <TabPane tab="forget" key="3">
                                												<Form className="formTags" onSubmit={this.handleSubmit_forget.bind(this)}>
                                													<FormItem label= {<p style={{display:"inline-block",margin: 0}}>  <Icon style={{fontSize:"28px"}} type="mail" theme="twoTone" twoToneColor="#52c41a"/> Email</p>} >
                                														<Input placeholder="Enter your email" {...getFieldProps('r_userEmail')}/>
                                													</FormItem>
                                													<Button type="primary" htmlType="submit">Click and verify through email</Button>
                                												</Form>
                                											</TabPane>
                                										</Tabs>
                                									</Modal>
            </header>
        )
    }
}
MenuNav = Form.create({})(MenuNav);
export default MenuNav
