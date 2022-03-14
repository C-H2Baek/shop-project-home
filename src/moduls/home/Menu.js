import React from "react";
import "../styles/menu.scss"

function Menu(){

    const open_category = () =>{
        const category = document.querySelector('.menu-box')
        const slide = document.querySelector('.slide')
        category.classList.add('close')
        slide.classList.remove('close')
        slide.classList.add('open')
        
      }
    return(
        <>
            <div className="menu-box close" onMouseOut={open_category}>
                <div className="menu">
                     메뉴 미완성
                </div>
            </div>
        </>
    )
}
export default Menu
