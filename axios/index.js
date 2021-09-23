import axios from 'axios'
import { Modal, message } from 'antd'
import { withRouter } from 'react-router-dom';
import { Router, Route, Link, browserHistory } from 'react-router-dom';
export default class Axios {

    static ajax(options){

        let baseApi = 'https://api.americanmuslimtoday.net/amt-news/api/v1';
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:'get',
                baseURL:baseApi,
                timeout:5000,
                params: (options.data && options.data.params) || ''
            }).then((response)=>{
                console.log(response);
                if (response.status == '200'){
                    let res = response.data;
                    if (!res.errors){
                        resolve(res);
                    }else{
                        Modal.info({
                            title:"warning",
                            content:res.errors[0].message
                        })
                    }
                }else{

                    reject(response.data);

                }
            },
            (error) => {
              reject(error.data);
            }



          )

        });
    }

    static post(options){

        let baseApi = 'https://api.americanmuslimtoday.net/amt-news/api/v1';
        return new Promise((resolve,reject)=>{
            axios({
                url:options.url,
                method:'post',
                baseURL:baseApi,
                timeout:5000,
                data: (options.data && options.data.params) || '',
                headers: {
                  'Authorization': localStorage.usertocken && 'Bearer '+ localStorage.usertocken || ''
                }
            }).then((response)=>{
                console.log(response);
                if (response.status == 401) {
                    localStorage.clear();
                    this.props.history.push(`/user/login`);

                  }

                if (response.status == '204' || '200'){
                    Modal.success({
                        title:"success",
                        content: "post successfully"
                    })
                    message.success('post successfully');
                    let res = response.data;
                    if (!res.errors){
                        resolve(res);
                    }else{
                        Modal.info({
                            title:"warning",
                            content:res.errors[0].message
                        })
                    }

                }else{
                    let res = response.data;
                    Modal.error({
                        title:"error",
                        content:res.errors[0].message
                    })

                    reject(response.data);

                }
            },
            (error) => {

              let res = error.response;
              console.log(res);
              if (res.status == 401) {
                  localStorage.clear();
              //    this.props.history.push(`/user/login`);

                }
              Modal.error({
                  title:"error",
                  content: error.response.data.errors && error.response.data.errors[0] && error.response.data.errors[0].message || error.response.data.error
              })

              reject(error.response);
            }
          )

        });
    }



        static postGetList(options){

            let baseApi = 'https://api.americanmuslimtoday.net/amt-news/api/v1';
            return new Promise((resolve,reject)=>{
                axios({
                    url:options.url,
                    method:'post',
                    baseURL:baseApi,
                    timeout:5000,
                    data: (options.data && options.data.params) || ''
                    // headers: {
                    //   'Authorization': localStorage.usertocken && 'Bearer '+ localStorage.usertocken
                    // }
                }).then((response)=>{
                    console.log(response);
                    if (response.status == '204' || '200'){
                        // Modal.success({
                        //     title:"success",
                        //     content: "post successfully"
                        // })
                        let res = response.data;
                        if (!res.errors){
                            resolve(res);
                        }else{
                            Modal.info({
                                title:"warning",
                                content:res.errors[0].message
                            })
                        }
                    }else{
                        let res = response.data;
                        Modal.error({
                            title:"error",
                            content:res.errors[0].message
                        })

                        reject(response.data);

                    }
                },
                (error) => {
                  Modal.error({
                      title:"error",
                      content: error.response && error.response.data.errors[0] && error.response.data.errors[0].message
                  })

                  reject(error.response);
                }
              )

            });
        }





















}
