import './contentlist.scss';
import { Rate, Spin } from 'antd';
import { Button, WhiteSpace, WingBlank, Tag } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router-dom';
class ContentList extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          news:[],
          loading: false,
          currentRegion:'',
          currentState:'',
          currentPage:1,
          totalCount:'',
          currentCity:'',
          currentStateName:'',
          currentCityName:'',
          search:'',
          currentCategoryName:'',


      }
  }
  handleReset =() => {
    this.props.history.push(`/classifiedlist/${this.props.id}`)

  }

  getStateName = (stateId) => {
    // get all states code and their stateId
    var myFetchOptions = {
        method: 'GET'
        };
        fetch("https://api.americanmuslimtoday.net/amt-news/api/v1/states", myFetchOptions)
        .then(response => response.json())
        .then(json => {
          (json.length>0) && json.forEach((item,index) => {
            if (item.stateId == stateId){
               this.setState({
                 currentStateName: item.name,
               })
            }
          })

        });
        return 0;
  }
  getCityName = (cityId) => {
    // get all states code and their stateId
    var myFetchOptions = {
        method: 'GET'
        };
        fetch("https://api.americanmuslimtoday.net/amt-news/api/v1/cities", myFetchOptions)
        .then(response => response.json())
        .then(json => {
          (json.length>0) && json.forEach((item,index) => {
            if (item.cityId == cityId){
               this.setState({
                 currentCityName: item.name,
               })
               return true
            }
          })

        });
        return 0;
  }
  getCategoryName = (categoryId) => {
    // get all states code and their stateId
    var myFetchOptions = {
        method: 'GET'
        };
        fetch("https://api.americanmuslimtoday.net/amt-news/api/v1/classifieds/categories", myFetchOptions)
        .then(response => response.json())
        .then(json => {
          (json.length>0) && json.forEach((item,index) => {
            if (item.id == categoryId){
               this.setState({
                 currentCategoryName: item.category,
               })
               return true
            }
          })

        });
        return 0;
  }
  handleLoadmore = () => {
    this.setState({
      loading: true,
    })
    var myFetchOptions = {
          method: 'GET'
        };
        fetch(`https://api.americanmuslimtoday.net/amt-news/api/v1/classifieds?page=${this.state.currentPage + 1}&pageSize=25&classifiedCategory=${this.props.id}&regionId=${this.state.currentRegion}&state=${this.state.currentState}&city=${this.state.currentCity}`, myFetchOptions)
  //      fetch("https://api.americanmuslimtoday.net/amt-news/api/v1/classifieds?classifiedSubCategory=43800d11-af05-440a-90b6-3fbaa8407976", myFetchOptions)
        .then(response =>
          {
             this.setState({
               loading: false,
             })
             return response.json();
          }
        )
        .then(json =>
          { // let totalCount = parseInt(json.totalCount / json.pageSize) +1 ;  This is counting for page, but antd already done this so dont need.
            let new_list=json.list;
            if(json.list){
              for (let i=0 ; i<=new_list.length ; i++) {
                if (new_list[i] && !new_list[i].hasOwnProperty("classifiedImages")){   //后台没给image得我自己补上字段 不然就报错
                     new_list[i].classifiedImages = "xx";
                }
                if (new_list[i] && new_list[i].hasOwnProperty("classifiedImages")){

                  console.log(new_list[i].classifiedImages);
                  new_list[i].classifiedImages = new_list[i].classifiedImages[0].image;
                }
              }
              json && this.setState({
                loading: false,
                currentPage: this.state.currentPage + 1 ,
                news: [...this.state.news,...new_list],   // [...arr] is the copy
              });
            }
          }
        );


  }

      componentDidMount() {
              console.log(this.props.regionId);
              this.props.stateId &&  this.getStateName(this.props.stateId)
              this.props.cityId &&  this.getCityName(this.props.cityId)
              this.props.id &&  this.getCategoryName(this.props.id)
              if (!this.props.cityId){
                this.setState({
                  currentCityName:'',
                })
              }
              if (!this.props.stateId){
                this.setState({
                  currentStateName:'',
                })
              }
              // all above first process the tag name update
              // then do fetch new data below
              this.props.regionId && this.setState({
                currentRegion:   this.props.regionId,
              })
              this.props.stateId && this.setState({
                currentState:   this.props.stateId,

              })
              this.props.cityId && this.setState({
                currentCity:   this.props.cityId,
              })
              this.props.searchText && this.setState({
                search:   this.props.searchText,
              })
              let optionalFilter = '';
              if (this.props.id) {
                  optionalFilter += `&classifiedCategory=${this.props.id}`;
              }
              // if (this.props.regionId) {
              //     optionalFilter +=  `&regionId=${this.props.regionId}`;
              // }
              if (this.props.stateId) {
                  optionalFilter +=  `&state=${this.props.stateId}`;
              }
              if (this.props.cityId) {
                  optionalFilter +=  `&city=${this.props.cityId}`;
              }

              var myFetchOptions = {
              			method: 'GET'
              		};
//              		fetch(`https://api.americanmuslimtoday.net/amt-news/api/v1/classifieds?page=1&pageSize=25&classifiedCategory=${this.props.id}&regionId=${regionId}`, myFetchOptions)
              		fetch(`https://api.americanmuslimtoday.net/amt-news/api/v1/classifieds?page=1&pageSize=25${optionalFilter}`, myFetchOptions)
            //      fetch("https://api.americanmuslimtoday.net/amt-news/api/v1/classifieds?classifiedSubCategory=43800d11-af05-440a-90b6-3fbaa8407976", myFetchOptions)
              		.then(response =>
                    {
                       return response.json();
                    }
                  )
              		.then(json =>
                    { // let totalCount = parseInt(json.totalCount / json.pageSize) +1 ;  This is counting for page, but antd already done this so dont need.
                      let new_list=json.list;
                      if(json.list){
                        for (let i=0 ; i<=new_list.length ; i++) {
                          if (new_list[i] && !new_list[i].hasOwnProperty("classifiedImages")){   //后台没给image得我自己补上字段 不然就报错
                               new_list[i].classifiedImages = "xx";
                          }
                          if (new_list[i] && new_list[i].hasOwnProperty("classifiedImages")){

                            console.log(new_list[i].classifiedImages);
                            new_list[i].classifiedImages = new_list[i].classifiedImages[0].image;
                          }
                        }
                        console.log(new_list);
                        json && this.setState({news: new_list});
                    //    json && this.setState({currentCategory: json.list[0].classifiedCategory.category})
                        json && this.setState({totalCount: json.totalCount});
                        json && this.setState({loading: false});
                      }
                    }
                  );
      }

      componentWillReceiveProps(nextProps) {
          console.log(this.props)
          console.log(nextProps);
         nextProps.stateId &&  this.getStateName(nextProps.stateId)
         nextProps.cityId &&  this.getCityName(nextProps.cityId)
         if (!nextProps.cityId){
           this.setState({
             currentCityName:'',
           })
         }
         if (!nextProps.stateId){
           this.setState({
             currentStateName:'',
           })
         }
         // all above first process the tag name update
          if (nextProps!== this.props) {

            this.setState({
              currentRegion: nextProps.regionId? nextProps.regionId : '',
            })
           this.setState({
            currentState: nextProps.stateId? nextProps.stateId : '',
          })
         this.setState({
          currentCity: nextProps.cityId? nextProps.cityId : '',
        })
           this.setState({
              search:  nextProps.searchText? nextProps.searchText : '',
            })
            this.setState({
              news: [],
              loading: true,
              search: nextProps.searchText,
              currentPage: 1,  // every time location change or search change, we  convert back to first page
            //  currentPage: 1,
            })
            var regionId="";
            var currentState = '';
            var currentCity = '';
            var searchText = '';
            if (nextProps.stateId && nextProps.stateId != 'All'){
              currentState = nextProps.stateId;
            }
            if (nextProps.regionId){
              regionId = nextProps.regionId;
            }
            if (nextProps.cityId){
              currentCity = nextProps.cityId;
            }
            if (nextProps.searchText){
              searchText = nextProps.searchText;
            }
          //  console.log(`https://api.americanmuslimtoday.net/amt-news/api/v1/classifieds?page=1&pageSize=25&classifiedCategory=${this.props.id}&state=${currentState}&searchText=${searchText}`);
            var myFetchOptions = {
                  method: 'GET'
                };
                fetch(`https://api.americanmuslimtoday.net/amt-news/api/v1/classifieds?page=1&pageSize=25&classifiedCategory=${this.props.id}&state=${currentState}&city=${currentCity}&searchText=${searchText}`, myFetchOptions)
          //      fetch("https://api.americanmuslimtoday.net/amt-news/api/v1/classifieds?classifiedSubCategory=43800d11-af05-440a-90b6-3fbaa8407976", myFetchOptions)
                .then(response =>
                  {
                    console.log(response);
                    if (response.status=="500") {
                        return false
                    }
                     return response.json();
                  }
                )

                .catch(e =>
                  {
                    console.log(e);
                    return false;
                   }
                 )
                .then(json =>
                  {
                     this.setState({
                       totalCount: json.totalCount,
                       loading: false,
                     })
                     let new_list=json.list;
                     if(json.list){
                       for (let i=0 ; i<=new_list.length ; i++) {
                         if (new_list[i] && !new_list[i].hasOwnProperty("classifiedImages")){   //后台没给image得我自己补上字段 不然就报错
                              new_list[i].classifiedImages = "xx";
                         }
                         if (new_list[i] && new_list[i].hasOwnProperty("classifiedImages")){

                           console.log(new_list[i].classifiedImages);
                           new_list[i].classifiedImages = new_list[i].classifiedImages[0].image;
                         }
                       }
                       new_list = new_list.concat(new_list);
                       console.log(new_list);
                       json && this.setState({
                         news: new_list,
                        // loading: false,
                       });
                     }
                  }
                );
          }
      }
  render(){
    const {news} = this.state
    console.log(news);
    const newsList = news? news.map((item, index) => (
      <Link className="classified-link"  to={`/classifieddetails/${item.classifiedId}`}  target="_blank">
      <div className= {item.phoneNumber? "r-item-content scale-1px active pay-style": "r-item-content scale-1px" } style={item.phoneNumber? {backgroundColor: '#1c527c'}:null}>
          <div className="img-block">
          <img className="item-img" src={item.classifiedImages} />
          </div>
          <div className="item-info-content">
              <div className="item-firstline">
              <p className="item-title">{item.title}</p> {/* <Rate disabled defaultValue={5} className="star" /> */}
              </div>
              <div className="item-desc clearfix">
                  <div className="item-score"> {item.classifiedSubCategory && item.classifiedSubCategory.subCategory}</div>
                  <div className="item-count"></div>
                  <div className="item-distance"> {item.state && item.state.code}</div>
                  <div className="item-time">{item.city && item.city.name}</div>
              </div>
              <div className="item-price">
                  <div className="item-pre-price">{item.streetAddress}</div>
                  <div className="item-meituan-flag"></div>
              </div>
              <div className="item-others">

                    <div className="other-content">{item.phoneNumber} {item.email}</div>
              </div>
          </div>
      </div>

      </Link>
        ))
        :    'loading please wait'



      return (
          <div>
          <Tag style={{marginBottom:"5px"}}>{this.state.currentCategoryName}  </Tag> >
          {this.state.currentStateName && (<Tag style={{marginBottom:"5px"}}>{this.state.currentStateName}</Tag>) }  >
          {this.state.currentCityName && (<Tag style={{marginBottom:"5px"}}>{this.state.currentCityName}</Tag>)  }
          <Tag style={{float:"right"}} onChange={this.handleReset.bind(this)}>Reset</Tag>
          <Spin tip="Loading..." spinning={this.state.loading}   size="large" style={{position:"relative", top:"200px"}}>
          { newsList }
          <Button onClick={this.handleLoadmore.bind(this)} icon={<img src="https://gw.alipayobjects.com/zos/rmsportal/jBfVSpDwPbitsABtDDlB.svg" alt="" />}>click to load more</Button><WhiteSpace />
          <div  className="r-item-content scale-1px">
              <div className="img-block">
              <img className="item-img" src="https://media.npr.org/assets/img/2018/04/10/img_7956_custom-849c7a5f39ee9dec9272abb40fa1d41a53774924-s2500-c85.jpg" />
              </div>
              <div className="item-info-content">
                  <div className="item-firstline">
                  <p className="item-title">This is the end</p> <Rate disabled defaultValue={5} className="star" />
                  </div>
                  <div className="item-desc clearfix">
                      <div className="item-score">No more data </div>
                      <div className="item-count"></div>
                      <div className="item-distance">Bottom</div>
                      <div className="item-time">Line</div>
                  </div>
                  <div className="item-price">
                      <div className="item-pre-price">No more data</div>
                      <div className="item-meituan-flag"></div>
                  </div>
                  <div className="item-others">

                        <div className="other-content">item.info</div>
                  </div>
              </div>
          </div>



          </Spin>
          </div>
      );
  }
}


export default withRouter(ContentList);
