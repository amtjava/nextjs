import React, { Component } from 'react';
import './style.scss';
import { Row, Col, Modal, Button, Input , message} from 'antd';
import { Form } from '@ant-design/compatible'
const FormItem = Form.Item;
class Footer extends Component {
    constructor(){
        super();
        this.state={
            showModal1: false,
            showModal2: false,
            loading: false,
        }
    }
    showModal= (type) => {
        this.setState({
          [type]: true,
        });
      };
    handleOk = (e) =>{
        e.preventDefault();
        this.setState({loading: true});

    // 		body 数据，格式 key=val&key=val&key=val
        var formData = this.props.form.getFieldsValue();
        let body={
            "address": formData.address,
            "email": formData.email,
            "phone":  formData.phone,
            "userName": formData.userName,
            "yourQuery": formData.yourQuery,
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
        fetch("https://api.americanmuslimtoday.net/amt-news/api/v1/contactUs", myFetchOptions)
        .then(response => {
          this.setState({
              loading: false,
              showModal2: false,});
          if (response.status=="201" || response.status=="200") {
            Modal.success({
             content: 'success, you have posted your query! ',
           });
            message.success("success, you have posted your query!");
          }
          else {
            message.error("Please check your input again, or maybe change a new email address");
            return response.json()
          }

        })
        .then(json => {
        if (json){
          Modal.error({
               title: 'This is an error message',
               content: json.errors[0].message,
             });
        throw "network error";
        }
        })
        .catch(e => console.log(e));
        if (this.state.action=="login") {
          this.setState({hasLogined:false});
        }



    };
    handleCancel = () =>{
        this.setState({
            showModal2: false,
        });
    };



    render() {
        const baseUrl = "https://americanmuslimtoday.com"
        const {TextArea} = Input;
        const { getFieldDecorator } = this.props.form;
        const { form } = this.props;
        var formData = form.getFieldsValue();
        console.log(formData);
        // const {loading} = this.state;
        return (
            <footer className="footer" id="footer">
                <Row className="footer-row">
                <div className="policy-module">
                        <div className="info-list-module">
                            <a href="#!" onClick={()=>this.showModal('showModal1')}>About us</a>
                            <a href={baseUrl+"/submission-policy"}>Submission policy</a>
                            <a href={baseUrl+"/policies-standards"}>Policies & standards</a>
                            <a href={baseUrl+"/policy-page"}>Privacy policy</a>
                            <a href={baseUrl+"/classifiedhome"} target="_blank">Ad choices</a>
                            <a href="#!" onClick={()=>this.showModal('showModal2')}>Contact us</a>
                            <a href={baseUrl+"/donate"}>Donate</a>

                        </div>
                    </div>
                    <div className="introduce-module">
                        <span className="big-title">OPINION</span>
                        <div className="text-list-module">
                            <a href={baseUrl+"/opinion-page"}>Opinion Matters</a>
                            <a href={baseUrl+"/opinion-page"}>Letters to the Editor</a>
                        </div>
                    </div>
                    <div className="introduce-module">
                        <span className="big-title">LEGAL</span>
                        <div className="text-list-module">
                            <a href={baseUrl+"/other-page/legal"}>Legal Matters</a>
                        </div>
                    </div>
                    <div className="introduce-module">
                        <span className="big-title">HEALTH</span>
                        <div className="text-list-module">
                            <a href={baseUrl+"/other-page/health"}>Health Matters</a>
                        </div>
                    </div>
                    <div className="introduce-module">
                        <span className="big-title">FAITH</span>
                        <div className="text-list-module">
                            <a href={baseUrl+"/other-page/faith"}>Faith Matters</a>
                        </div>
                    </div>
                    <div className="introduce-module">
                        <span className="big-title">YOUTH</span>
                        <div className="text-list-module">
                            <a href={baseUrl+"//other-page/youth"}> Youth Matters</a>
                        </div>
                    </div>
                    <div className="introduce-module">
                        <span className="big-title">LIFE</span>
                        <div className="text-list-module">
                            <a href={baseUrl+"/life-page"}>Business&Marketing</a>
                            <a href={baseUrl+"/life-page"}>Food&Nutrition</a>
                            <a href={baseUrl+"/life-page"}>Parenting&Education</a>
                        </div>
                    </div>
                    <div className="introduce-module">
                        <span className="big-title">CULTURE</span>
                        <div className="text-list-module">
                            <a href={baseUrl+"/culture-page"}>Art&Decor</a>
                            <a href={baseUrl+"/culture-page"}>Fashion&Style</a>
                            <a href={baseUrl+"/culture-page"}>Literature&Books</a>
                        </div>
                    </div>
                </Row>
                <Row className="page-footer-text">Copyright © AMT. All Right Reserved 2020</Row>

                <Modal
                            title="Contact Us"
                            visible={this.state.showModal1}
                            onOk={()=>
                                this.setState({
                                    showModal1: false,
                                })
                            }
                            onCancel={()=>
                                this.setState({
                                    showModal1: false,
                                })
                            }
                            foot={[null]}

                            >
                            <p style={{fontSize: "16px", textShadow: "#E6D205"}}>American Muslim Today (AMT) is a dynamic and inclusive forum which celebrates the diversity and immense contribution of Muslims in the West, as well empowering new generations of Muslim voices to write their own narrative and inspiring the leaders of tomorrow.</p>
                            </Modal>
                            <Modal
                            title="About Yourself"
                            visible={this.state.showModal2}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            foot={[
                                <Button key="back" onClick={this.handleCancel}>
                                    Return
                                </Button>,
                                <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
                                    Submit
                                </Button>,
                            ]}
                            >

                          	<Form className="list-input" horizontal>
                            <FormItem>
                               <p style={{color: "#09102c", fontSize: "16px"}}><svg t="1603231935451" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11619" width="35" height="35"><path d="M512 917.333333a405.333333 405.333333 0 1 1 405.333333-405.333333 405.76 405.76 0 0 1-405.333333 405.333333z m0-768a362.666667 362.666667 0 1 0 362.666667 362.666667A363.093333 363.093333 0 0 0 512 149.333333z" fill="#FF4500" p-id="11620"></path><path d="M298.666667 733.44a20.906667 20.906667 0 0 1-14.933334-5.973333 21.76 21.76 0 0 1 0-30.293334 320.853333 320.853333 0 0 1 450.56-5.546666 21.333333 21.333333 0 0 1-29.44 31.146666 277.76 277.76 0 0 0-390.826666 4.693334 21.333333 21.333333 0 0 1-15.36 5.973333z" fill="#FF4500" p-id="11621"></path><path d="M512 533.333333A149.333333 149.333333 0 1 1 661.333333 384a149.333333 149.333333 0 0 1-149.333333 149.333333z m0-256A106.666667 106.666667 0 1 0 618.666667 384 106.666667 106.666667 0 0 0 512 277.333333z" fill="#FF4500" p-id="11622"></path></svg>Name<b style={{color: 'red'}}>*</b>：</p>
                               {getFieldDecorator('userName')(<Input style={{marginBottom: "10px"}} size="large" placeholder="input your name" /> )}
                            </FormItem>
                            <FormItem>
                               <p style={{color: "#09102c", fontSize: "16px"}}><svg t="1597950692260" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="28655" width="37" height="37" style={{paddingRight: '5px'}}><path d="M810.667 170.667H213.333a128 128 0 0 0-128 128v426.666a128 128 0 0 0 128 128h597.334a128 128 0 0 0 128-128V298.667a128 128 0 0 0-128-128zM782.08 256L512 458.667 241.92 256z m28.587 512H213.333a42.667 42.667 0 0 1-42.666-42.667v-416l315.733 236.8a42.667 42.667 0 0 0 25.6 8.534 42.667 42.667 0 0 0 25.6-8.534l315.733-236.8v416A42.667 42.667 0 0 1 810.667 768z" fill="#D81E06" p-id="28656"></path></svg>Email<b style={{color: 'red'}}>*</b>： </p>
                               {getFieldDecorator('email')(<Input style={{marginBottom: "10px"}} size="large" placeholder="input your email" />  )}
                            </FormItem>
                            <FormItem>
                               <p style={{color: "#09102c", fontSize: "16px"}}><svg t="1597951463201" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="39040" width="32" height="32" style={{paddingRight: '5px'}}><path d="M732.16 451.584c0 21.589333 14.336 35.925333 35.925333 35.925333s36.010667-14.336 36.010667-35.925333a216.405333 216.405333 0 0 0-215.893333-215.893333c-21.504 0-35.84 14.506667-35.84 36.010666 0 21.589333 14.336 36.010667 35.84 36.010667A144.213333 144.213333 0 0 1 732.16 451.584z m143.872 0c0 21.589333 14.421333 35.925333 36.010667 35.925333 21.504 0 35.84-14.336 35.84-35.925333a360.789333 360.789333 0 0 0-359.594667-359.68c-21.589333 0-36.010667 14.421333-36.010667 36.010667s14.506667 35.925333 36.010667 35.925333a288.597333 288.597333 0 0 1 287.744 287.744z m-485.546667-125.866667c39.594667-39.594667 43.178667-100.693333 7.168-143.957333L286.208 41.557333C250.197333-5.205333 181.76-12.458667 135.082667 23.552c-3.584 3.584-7.168 3.584-7.168 7.168L30.805333 128c-93.525333 93.44 39.594667 345.258667 280.576 586.24 240.896 240.896 489.045333 370.432 582.570667 280.490667l97.109333-97.109334c43.178667-43.178667 43.178667-111.530667 0-151.04l-7.168-7.253333-140.288-111.445333A105.557333 105.557333 0 0 0 699.733333 634.88l-61.098666 61.184c-64.768-39.594667-122.282667-82.773333-172.714667-133.12-50.346667-50.346667-93.44-107.861333-133.034667-172.629333l57.6-64.682667z m-50.346666-97.194666c10.752 14.506667 10.752 36.010667-3.669334 46.848l-79.104 82.688a38.229333 38.229333 0 0 0-7.168 43.178666c42.410667 77.909333 95.744 149.333333 158.293334 212.138667a932.864 932.864 0 0 0 212.138666 158.293333c14.506667 6.826667 31.744 4.010667 43.178667-7.253333l82.773333-82.688a33.962667 33.962667 0 0 1 46.762667-3.584l140.202667 115.114667s3.584 0 3.584 3.584a34.730667 34.730667 0 0 1 0 50.346666l-97.109334 97.194667c-46.677333 46.677333-269.653333-72.021333-481.962666-280.661333C145.92 455.168 30.805333 228.693333 77.653333 181.76L178.346667 81.066667c14.421333-10.752 39.594667-10.752 50.346666 7.253333l111.530667 140.288z" fill="#DF6250" p-id="39041"></path></svg>Phone： </p>
                               {getFieldDecorator('phone')(<Input style={{marginBottom: "10px"}} size="large" placeholder="input your phone" />   )}
                            </FormItem>
                            <FormItem>
                               <p style={{color: "#09102c", fontSize: "16px"}}><svg t="1597951324376" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="30811" width="32" height="32" style={{paddingRight: '5px'}}><path d="M128 320m128 0l512 0q128 0 128 128l0 448q0 128-128 128l-512 0q-128 0-128-128l0-448q0-128 128-128Z" fill="#7BDFF2" p-id="30812"></path><path d="M590.88 29.76l364.768 285.44A128 128 0 0 1 876.768 544H147.2a128 128 0 0 1-78.88-228.8l364.768-285.44a128 128 0 0 1 157.76 0z" fill="#7BDFF2" p-id="30813"></path><path d="M480 672h64a128 128 0 0 1 128 128v224H352v-224a128 128 0 0 1 128-128z" fill="#FF7959" p-id="30814"></path></svg>Address： </p>
                               {getFieldDecorator('address')(<Input style={{marginBottom: "10px"}} size="large" placeholder="input your address" />   )}
                            </FormItem>
                            <FormItem>
                               <p style={{color: "#09102c", fontSize: "16px"}}><svg t="1603232028512" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12508" width="38" height="38"><path d="M898.909091 341.829818a407.109818 407.109818 0 0 0-87.272727-129.466182 404.130909 404.130909 0 0 0-129.466182-87.272727A404.014545 404.014545 0 0 0 523.636364 93.090909c-54.993455 0-108.357818 10.705455-158.557091 32a407.109818 407.109818 0 0 0-129.442909 87.272727 404.130909 404.130909 0 0 0-87.272728 129.466182A404.014545 404.014545 0 0 0 116.363636 500.363636c0 54.993455 10.705455 108.357818 32 158.557091a407.109818 407.109818 0 0 0 87.272728 129.442909 404.130909 404.130909 0 0 0 129.466181 87.272728A404.014545 404.014545 0 0 0 523.636364 907.636364c54.993455 0 108.357818-10.705455 158.557091-32a407.109818 407.109818 0 0 0 129.442909-87.272728 405.620364 405.620364 0 0 0 87.272727-129.466181A404.014545 404.014545 0 0 0 930.909091 500.363636c0-54.993455-10.705455-108.357818-32-158.557091z m-131.002182 347.229091a22.574545 22.574545 0 0 1-22.621091 22.481455h-167.028363l-127.534546 78.708363c-4.957091 3.025455-11.357091-1.070545-10.472727-6.818909l-1.256727-71.796363h-137.076364a22.574545 22.574545 0 0 1-22.644364-22.481455V325.026909a22.574545 22.574545 0 0 1 22.621091-22.481454h443.485091a22.574545 22.574545 0 0 1 22.621091 22.481454v364.032h-0.093091zM441.972364 465.454545a23.272727 23.272727 0 1 0 0 46.545455h140.055272a23.272727 23.272727 0 0 0 0-46.545455h-140.055272z m186.158545 93.09091h-209.082182c-12.846545 0-23.412364 10.496-23.412363 23.272727 0 12.776727 10.565818 23.272727 23.412363 23.272727h209.175273c12.846545 0 23.412364-10.496 23.412364-23.272727-0.093091-12.776727-10.658909-23.272727-23.505455-23.272727z m-209.082182-116.363637h209.175273c12.846545 0 23.412364-10.496 23.412364-23.272727 0-12.776727-10.565818-23.272727-23.412364-23.272727h-209.175273c-12.846545 0-23.412364 10.496-23.412363 23.272727 0 12.776727 10.565818 23.272727 23.412363 23.272727z" fill="#FD715A" p-id="12509"></path></svg>Your query：   </p>
                                {getFieldDecorator('yourQuery')(<TextArea rows={4} />  )}
                            </FormItem>
                            <div className="page-logo" style={{marginTop: '10px',textAlign: 'right'}}><img src="https://amt-news.s3.us-east-2.amazonaws.com/dev/media/category/icon/TVRVNU56QTBOVFV6TkRFME5BPT0=.jpeg" width="50" height="50"/></div>
                            </Form>

                            </Modal>

            </footer>
        )
    }
}

Footer = Form.create({ name: 'contactus' })(Footer);
export default Footer
