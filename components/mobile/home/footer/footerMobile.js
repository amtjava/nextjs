import React, { Component } from 'react';
import style from './footer.module.scss';
import { TabBar } from 'antd-mobile';
class FooterMobile extends Component {

    render(){
        return (
            <div className={style.footer}>
                <p>Copyright © AMT Inc. All rights reserved 2020.</p>
                {/* <div className={style.FooterProtocol}>
                    <a href="javascript:;">'AMT Policy'</a>
                    <a href="javascript:;">'AMT Policy'</a>
                </div> */}


            </div>
        )
    }
}

export default FooterMobile
