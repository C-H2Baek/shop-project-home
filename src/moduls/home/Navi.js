import React from "react";
import { Link } from "react-router-dom";
import '../styles/naviStyle.scss'


function NaviList(){

    return(
        <>
            <div className="logo-box">
                <Link className="link" to ="/Home">
                    <button className="logo">Arzt</button>
                </Link>
            </div>


            <div className="search-box">
                <input className="search" type='search' name='searchKeyword' />
            </div>


            <div className="list">
                <ul>
                    <li className="navi-login"><img src="https://pics.gmarket.co.kr/pc/single/kr/common/image__header-mypage.svg"/></li>
                    <li className="interested-items"><img src="https://pics.gmarket.co.kr/pc/single/kr/common/image__header-recent.svg"/></li>
                    <li className="shopping-basket"><img src="https://pics.gmarket.co.kr/pc/single/kr/common/image__header-cart.svg"/></li>
                </ul>
                </div>
        </>
    )
}

export default NaviList