import React, { Component } from 'react';
import style from './style.module.scss';

class Life extends Component {
    render(){
        return (
            <div style={{padding: '10px 0'}}>
                <div className={style.lifemodule}>
                    <p className={style.title}>
                        <svg className={style.icon} aria-hidden="true" style={{width: 26,height: 21}}>
                            <use xlinkHref="#icon-shangjia"></use>
                        </svg>
                        housing
                    </p>
                    <div className={style.lifeboxmodule}>
                        <a href="javascript:;" style={{color: '#09a4fe'}}>
                            <span>leasing</span>
                        </a>
                        <a href="javascript:;">
                            <span>house</span>
                        </a>
                        <a href="javascript:;">
                            <span>long-term</span>
                        </a>
                        <a href="javascript:;">
                            <span>travel short-term</span>
                        </a>
                        <a href="javascript:;">
                            <span>manager</span>
                        </a>
                    </div>
                </div>

                <div className={style.lifemodule}>
                    <p className={style.title}>
                        <svg className={style.icon} aria-hidden="true" style={{width: 26,height: 21}}>
                            <use xlinkHref="#icon-shangjia"></use>
                        </svg>
                        sold company
                    </p>
                    <div className={style.lifeboxmodule}>
                        <a href="javascript:;" style={{color: '#09a4fe'}}>
                            <span>business</span>
                        </a>
                        <a href="javascript:;">
                            <span>sold shop</span>
                        </a>
                        <a href="javascript:;">
                            <span>start a business</span>
                        </a>
                        <a href="javascript:;">
                            <span>farm</span>
                        </a>
                        <a href="javascript:;">
                            <span>massage</span>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Life
