import React, { Component } from 'react';
import {Row, Col, message, Collapse, Input, Radio, Spin, Tooltip, Icon, BackTop, Button, Modal, Form, InputNumber, Checkbox, Pagination} from 'antd';
import './blogComment.scss';
import { Select } from 'antd';
import { Router, Route, Link, browserHistory } from 'react-router-dom';
import { FormOutlined } from '@ant-design/icons';


import axios from "./../../axios/index";

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;
const {Panel} = Collapse

class BlogComment extends Component {

  constructor(props) {
		super(props);
		this.state = {
      article: {},
      blog: [],
      comment: ''
		};
  }

  handleChange = (e) => {
    this.setState({
      comment: e.target.value,
    })


  }


      requestReplyList = () => {
        axios
          .ajax({
            url: `https://api.americanmuslimtoday.net/amt-news/api/v1/posts/replayList/${this.props.blogId}`,
            data: {
              params: {

              },
            },
          })
          .then(
            (res) => {
              console.log(res)
              this.setState({
                blog: res,
              });
            },
            (error) => {
              console.log(error);
            }
          );




      }


      onFinish = (values)=>{
         console.log(this.state.comment)
         let userInfo = {
           reply_content: this.state.comment
         }
          console.log(userInfo)
          this.postReply(userInfo)

      }

      postReply = (userInfo) => {
      axios
        .post({
          url: `/posts/replay`,
          data: {
            params: {
              "content": userInfo.reply_content,
              "postsType": "REPLAY",
              "replayUuid": this.props.blogId,
            }
          },
        })
        .then(
          (res) => {

            window.location.reload()
          //  this.props.history.push(`/blog-detail/${this.props.match.params.blogId}`);

            console.log(res);

          },
          (error) => {
            console.log(error);
            if (error.status == 401) {
                localStorage.clear();

                message.error('Your tocken is expired. Please login again');

              }

          }
        );

        this.requestReplyList();
      //  this.props.form.setFieldsValue({reply_content: ""});
    }





      componentDidMount(){
        this.requestReplyList();

      }

	render() {
    const {reply, blog} = this.state;

     // const { getFieldDecorator }  =this.props.form;
     // let formInfo = this.props.form.getFieldsValue();
     // console.log(formInfo);

    const replyList = blog.length?(
      blog.map((item, index) => (

          <section className="reply-block">

            <Icon type="user" style={{fontSize: "26px", marginRight:"5px"}} />
            <div class="words-wrapper">

            <div class="name">
            {item.userDto? item.userDto.name : "anonymous"}
            </div>

            <div className="content">
            {item.content}
            </div>

            <time title="2021-08-01 15:08" className="time">
            {item.createdDate}
            </time>

            </div>
          </section>
      ))

    ):  " There are no reviews yet "




		return (
			<div className="blog-comment-wrapper" style={{paddingTop:"10px"}}>


        <Row className="blog-row">

          <Col className="blog-content" xs={24} sm={24} md={24} lg={24} xl={24}>

          <div className="reply-number">
          <strong>
             Replies
          </strong>
          </div>

          <Collapse defaultActiveKey={['1']} style={{marginRight: "40px"}}>
            <Panel header="Click to hide the reply" key="1">
              <div className="reply-lists">
                {replyList}

              </div>
            </Panel>

          </Collapse>


          <Form layout="horizontal" className="blog-comment">
          <div className="reply-number">
            <strong>
              POST YOUR REPLY
            </strong>
          </div>
          <Form.Item name="reply_content"   rules= {[{
              required: true
            }]} >

              <TextArea  onChange={this.handleChange.bind(this)} rows={5}/>

          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary"   onClick={this.onFinish}>
              Add Comment
            </Button>
          </Form.Item>
          </Form>

          </Col>

        </Row>


			</div>
		);
	};
}


export default BlogComment;
