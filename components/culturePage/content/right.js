import React, { Component } from 'react';
import './right.scss';
import $ from 'jquery';
import "animate.css";

class Right extends Component {

  constructor() {
  super();
  this.state = {
      adv1:[]
  };

};

    categoryIdToAdv = (id) => {  // get categoryId then return the related advId
      console.log(id);
      if (id == '5e7ecc1b-e63d-497a-b646-7706dc3f4545') { // culture  5e7ecc1b-e63d-497a-b646-7706dc3f4545
        return '3ddae080-264a-48f0-9652-d5ae53241d2c';
      }
      if (id == 'faith'){  //  4009ff3f-3539-4aaa-a29d-2f46920c87b6'
        return '02f148a5-1375-4b16-b913-bbbca3c4ee47';
      }
      if (id == 'health'){   // health  c964b678-46cc-4dee-9590-cecf624b5337
        return 'c964b678-46cc-4dee-9590-cecf624b5337';
      }
      if (id == 'legal') {  //legal 7c80d75b-6b17-40d7-a8cf-5d47bfd6bdc7
        //return 'f70b035d-c105-48c9-a76e-41b7a87a2518';
        return 'ee8ac05a-9869-4c6e-9db9-40ea9fc75f88';
      }
      if (id == 'f70b035d-c105-48c9-a76e-41b7a87a2518') {  //opinion  f70b035d-c105-48c9-a76e-41b7a87a2518
        //return 'f70b035d-c105-48c9-a76e-41b7a87a2518';
        return '9fc96186-2243-4672-be43-33b0c353a851';
      }
      if (id == 'youth') {  //youth a5d376d2-70de-42aa-8f7b-fbd05feaeec8
        //return 'f70b035d-c105-48c9-a76e-41b7a87a2518';
        return '496d36df-1005-4e31-89a8-44a75299f821';
      }
       return '3ddae080-264a-48f0-9652-d5ae53241d2c';
    }
    componentDidMount() {

        var myFetchOptions = {  //广告
        method: 'GET'
        };
        fetch(`https://api.americanmuslimtoday.net/amt-news/api/v1/news?page=1&category=${this.categoryIdToAdv(this.props.categoryId)}`, myFetchOptions)
        .then(response => response.json())
        .then(json =>  {console.log(json); this.setState({adv1: json.list})});

}
componentDidUpdate(){
    this.scrollFadeIn();
}



    scrollFadeIn() {
        let num = 0,
            topArr = [];

        $(".right-module").find(".animated").each(function(){
            topArr.push($(this).offset().top - $(window).height() + 25);
            // 默认展示小于屏幕高度的
            if ($(this).offset().top < $(window).height()) {
                $(this).addClass('fadeInRight');
            }
        });

        $(window).scroll(res => {
            if(num < topArr.length && $(window).scrollTop() > topArr[num]){
                $(".right-module").find(".animated").eq(num).addClass('fadeInRight');
                num += 1;
            }
        })
    }

    render() {
        return (
            <div className="right-module">

                {
                  this.state.adv1.map((item,index)=>{
                    return (
                      <div className="adver-module animated">
                          <a className="adver-link" href={item.link} target="_blank" >
                              <div className="adver" style={{"backgroundImage" : 'url(' + item.bannerImage + ')' }}></div>
                          </a>
                      </div>

                    )

                  })

                }
      {/*         <div className="adver-module animated">
                    <a className="adver-link" href="#">
                        <div className="adver" style={{backgroundImage: 'url(/static/media/onePhoto.bb45fbbf.jpg)'}}></div>
                    </a>
                    <a className="adver-link" href="#">
                        <div className="adver" style={{backgroundImage: 'url(/static/media/onePhoto.bb45fbbf.jpg)'}}></div>
                    </a>
                </div>
                <div className="adver-module animated">
                    <a className="adver-link" href="#">
                        <div className="adver" style={{backgroundImage: 'url(/static/media/onePhoto.bb45fbbf.jpg)'}}></div>
                    </a>
                    <a className="adver-link" href="#">
                        <div className="adver" style={{backgroundImage: 'url(/static/media/onePhoto.bb45fbbf.jpg)'}}></div>
                    </a>
                </div>
                <div className="adver-module animated">
                    <a className="adver-link" href="#">
                        <div className="adver" style={{backgroundImage: 'url(/static/media/onePhoto.bb45fbbf.jpg)'}}></div>
                    </a>
                    <a className="adver-link" href="#">
                        <div className="adver" style={{backgroundImage: 'url(/static/media/onePhoto.bb45fbbf.jpg)'}}></div>
                    </a>
                </div> */}
            </div>
        )
    }
    componentWillReceiveProps(nextProps) {

        if (nextProps!== this.props) {

          var myFetchOptions = {  //广告
          method: 'GET'
          };
          fetch(`https://api.americanmuslimtoday.net/amt-news/api/v1/news?page=1&category=${this.categoryIdToAdv(nextProps.categoryId)}`, myFetchOptions)
          .then(response => response.json())
          .then(json =>  {console.log(json); this.setState({adv1: json.list})});


    }
}
}

export default Right
