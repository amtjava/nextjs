import './header.scss';
import { SearchBar, Button, WhiteSpace, WingBlank } from 'antd-mobile';
import React from 'react';
import { Menu, ActivityIndicator, NavBar } from 'antd-mobile';
import { message } from 'antd';
import { withRouter } from 'react-router-dom';
    /* eslint no-nested-ternary:0 */
  const data = [
    {
      value: 'b5e43530-0f38-485d-ae82-2a6c52aba3c7',
      label: 'Northeast',
      children: [
        {
          label: 'All Northeast',
          value: '1',
          disabled: false,
        },
        {
          label: 'CT',
          value: '2',
        },
        {
          label: 'MA',
          value: '3',
        }, {
          label: 'NJ',
          value: '4',
        }, {
          label: 'NY',
          value: '5',
        }, {
          label: 'PA',
          value: '6',
        },
      ],
    },
    {
      value: '858717e3-826a-49ab-80d0-6d990b0e1c3b',
      label: 'MidWest',
      children: [
        {
          label: 'All MidWest',
          value: '1',
        }, {
          label: 'IL',
          value: '2',
        }, {
          label: 'IN',
          value: '3',
        }, {
          label: 'MI',
          value: '4',
        },{
          label: 'KS',
          value: '5',
        },
        {
          label: 'MO',
          value: '6',
        }
      ],
    },
    {
      value: 'f74b9b1c-506e-47e8-a6f6-940fa7e399e9',
      label: 'South',
      children: [
        {
          label: 'All South',
          value: '1',
        }, {
          label: 'FL',
          value: '2',
        }, {
          label: 'MD',
          value: '3',
        }, {
          label: 'VA',
          value: '4',
        },{
          label: 'DC',
          value: '5',
        },
        {
          label: 'TN',
          value: '6',
        },
        {
          label: 'OK',
          value: '7'
        },
        {
          label: 'TX',
          value: '8'
        }
      ],
    },
    {
      value: '9601ce8a-2786-446f-8e4c-832ab48a2f35',
      label: 'West',
      children: [
        {
          label: 'All West',
          value: '1',
          disabled: false,
        },
        {
          label: 'AZ',
          value: '2',
        }, {
          label: 'NV',
          value: '3',
        }, {
          label: 'CA',
          value: '4',
        }, {
          label: 'WA',
          value: '5',
        },
      ],
    },
  ];

  class Header2 extends React.Component {
    constructor(...args) {
      super(...args);
      this.state = {
        initData: '',
        show: false,
        currentRegion:'',
        currentState:'',
        visible: false,
        tagVisible:false,
        value:'',
        regions:[],
        states:[],
        data:[],
      };
    }

    loadCitiesList = (stateId) => {
      var myFetchOptions = {
            method: 'GET'
          };
          fetch(`https://api.americanmuslimtoday.net/amt-news/api/v1/cities?stateId=${stateId}`, myFetchOptions)
    //      fetch("https://api.americanmuslimtoday.net/amt-news/api/v1/classifieds?classifiedSubCategory=43800d11-af05-440a-90b6-3fbaa8407976", myFetchOptions)
          .then(response =>
            {
               return response.json();
            }
          )
          .then(json =>
            {
                json && this.setState({
                //  citiesLists: json,
                });
            }
          );
    }

    loadingClassified = (stateId,cityId) => {
      message.success('Action in progress..', 2);
      this.props.history.push(`/classifiedlist/${this.props.id}/f74b9b1c-506e-47e8-a6f6-940fa7e399e9/${stateId}/${cityId}`);
  };
  handleSearch= (value) => {
    this.setState({ value });
    //用传过来的changeValue属性(props)，是个函数，呼叫它把value交给父组件中的函数去处理
    this.props.changeValue(value)
  };


    onChange = (value) => {
          console.log(value)    // value = [stateId,cityId]
      this.setState({
        show: false,
      })
      // let label='';
      // let regionId='';
      // regionId=value[0];
    //           console.log(data)
    //   data.forEach((dataItem) => {  // 找到选择的值得value所对应得label名字 比如 South -- TX
    //     console.log(dataItem)
    //       console.log(value)
    //     if (dataItem.value === value[0]) {
    //       label = dataItem.label;
    //       if (dataItem.children && value[1]) {
    //         dataItem.children.forEach((cItem) => {
    //           if (cItem.value === value[1]) {
    //             label += ` ${cItem.label}`;
    //           }
    //         });
    //       }
    //     }
    //   }
    // )
      // console.log(label);
      // let label_array = label.trim().split(" ");
      // let state = label_array[1];
      // console.log(state); console.log(regionId)
      this.loadingClassified(value[0],value[1]);
    }
    handleClick = (e) => {
      e.preventDefault(); // Fix event propagation on Android
      this.setState({
        show: !this.state.show,
      });
      // mock for async data loading
    //  if (!this.state.initData) {
        // setTimeout(() => {
        //   this.setState({
        //     initData: data,
        //   });
        // }, 500);

  //    }
    }

    onMaskClick = () => {
      this.setState({
        show: false,
      });
    }


        componentDidMount() {
          //LOAD REAGION DATA  FIRST
          var myFetchOptions = {
        method: 'GET'
        };
        fetch("https://api.americanmuslimtoday.net/amt-news/api/v1/regions", myFetchOptions)
        .then(response => response.json())
        .then(json => {
          json = json.filter((item,index) => {
           return item.name != "International"
          })


          json && this.setState({regions: json})

        });

        // get all states code and their stateId
        var myFetchOptions = {
            method: 'GET'
            };
            fetch("https://api.americanmuslimtoday.net/amt-news/api/v1/states", myFetchOptions)
            .then(response => response.json())
            .then(json => {
              const data = json.map((item, index) => {   // data is state -- city
               return  {
                  value: item.stateId,
                  label: item.name,
                  children: [
                    {
                      label: `All ${item.name}`,
                      value: '',
                      disabled: false,
                    }
                  ]
                }
              });

              json && this.setState({states: json})
              console.log(data);

              json.map((item,index) => {
                console.log(item.stateId)    // load cities for each state
                var myFetchOptions = {
                      method: 'GET'
                    };
                fetch(`https://api.americanmuslimtoday.net/amt-news/api/v1/cities?stateId=${item.stateId}`, myFetchOptions)
                    .then(response =>
                      {
                         return response.json();
                      }
                    )
                    .then(json =>
                      {
                          json && json.map((item,index2) => {
                                let tmp_obj =   {
                                    label: item.name,
                                    value: item.cityId,
                                  }
                                data[index].children.push(tmp_obj);
                          })
                          console.log(data)
                          this.setState({
                            initData: data,
                          })

                      }
                    );


              })

            });





        }

    render() {
      const {regions, states} = this.state;
      const data = states? states.map((item, index) => (
        {
          value: item.regionId,
          label: item.name,
          children: [
            {
              label: 'All Northeast',
              value: '1',
              disabled: false,
            },
            {
              label: 'CT',
              value: '2',
            },
            {
              label: 'MA',
              value: '3',
            }, {
              label: 'NJ',
              value: '4',
            }, {
              label: 'NY',
              value: '5',
            }, {
              label: 'PA',
              value: '6',
            },
          ],
        }

          ))
          :    null;

      console.log(this.props)
      const { initData, show } = this.state;
      const menuEl = (
        <Menu
          className="foo-menu"
          data={initData}
          value={['1', '3']}
          onChange={this.onChange}
      //    height={document.documentElement.clientHeight * 0.6}
          height={document.documentElement.clientHeight * 0.6}
        />
      );
      const loadingEl = (
        <div style={{ width: '100%', height: document.documentElement.clientHeight * 0.6, display: 'flex', justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </div>
      );
      return (
        <div>
        <SearchBar placeholder="Search" maxLength={8} cancelText='cancel' onChange={this.handleSearch} />

        <div className={show ? 'menu-active headermenu' : 'headermenu'}>



          <div>
            <NavBar
              leftContent="Filter"
              mode="light"
              icon={<img src="https://gw.alipayobjects.com/zos/rmsportal/iXVHARNNlmdCGnwWxQPH.svg" className="am-icon am-icon-md" alt="" />}
              onLeftClick={this.handleClick}
              className="top-nav-bar"
            >
              Click filter to choose
            </NavBar>
          </div>
          {show ? initData ? menuEl : loadingEl : null}
          {show ? <div className="menu-mask" onClick={this.onMaskClick} /> : null}
        </div>
        </div>
      );
    }

  }
export default withRouter(Header2);
