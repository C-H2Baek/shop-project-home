import { Component, React } from "react";
import { Link } from "react-router-dom";
import "../styles/register.scss";
import $ from "jquery";
import Modal from "../Modal";
import axios from 'axios';

class Registers extends Component {
  state = {
    id: "",
    pw: "",
    cpw:"",
    names: "",
    sex: "",
    phone: "",
    mail: "",
    open: false,
    isFocused: false,
    isChecked: {male: false, female: false},
    isPssword: false
  };
  openModal = () => {
    this.setState({ open: true })
  }
  closeModal = () => {
    this.setState({ open: false ,isFocused:false})
  }
  handleChange = (e) => {
    const { isFocused} = this.state
    if(!isFocused){
        const { name, value } = e.target
        if(name ==='sex'){
            this.setState({sex: value})
        }
        this.setState({ [name]: value}) 
    }
    
}
  create = (e) => {
    const ids = ['#id','#pw','#cpw','#names','#sex','#phone','#mail']
    const {pw,cpw,id,names, sex,phone,mail}= this.state
    const datas = [id,pw,names,sex,phone,mail]
    let btn = $("#btn");    
    for(let id of ids){
        $(btn).on("click", function () {
        if ($(id).val() == "") {
            $(id).next("label").addClass("warning");
            setTimeout(function () {
            $("label").removeClass("warning");
            }, 1500);
        }});
    }

    if(pw != '' && cpw != ''){
      if(pw === cpw){
        this.setState({isPssword:true})
      }else{
        alert("입력한 비밀번호가 일치하지 않습니다!")
      }
    }
    let isfull = false
    if(pw === cpw){
      for(let data of datas){
        if(data != ""){
          isfull = true
        }else{
          isfull = false
          break
        }
      }
      // const reg = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
      // if(!reg.test(mail)){
      //   e.preventDefault()
      //   isfull = false
      //   alert("이메일 형식이 올바르지 않습니다.")
      // }

      if(isfull == true){
        axios(
          {
            url: '/register',
            method: 'post',
            data: {
              id:id,
              password:pw,
              name:names,
              sex:sex,
              phone:phone,
              mail:mail
            }, 
            baseURL: 'http://localhost:8088'
          }
        ).then(response => {
          e.preventDefault()
          alert("회원가입에 성공하였습니다.")
        })
      }
   };
  }
  setgender = () => {
    const {isChecked} = this.state

    if(isChecked.male == true && isChecked.female == false){
        this.setState({sex:"Male"})
    }else{
        this.setState({sex:"Female"})
    }
    this.closeModal()
  }
  setCheck = (e) => {
      const gender = e.target.name
      if(gender === 'male'){
          this.setState({isChecked: {male: true, female: false}})
      }else{
        this.setState({isChecked: {male: false, female: true}})
      }
  }
  isNummer = (e) => {
    const { name, value } = e.target
    if(value.length > 13){
      alert("더 이상 입력이 불가능합니다.")
    }
    else if(isNaN(value.split('').filter(e => e != "-").join(''))){
        alert("숫자만 입력해주세요.")
    }else{
      this.setState({phone:this.phoneNumber(value)})
    }
  }
  phoneNumber = (phone)=>{
    const text = []
    for(let i = 0; i<phone.length; i++){
      if(i==3 && phone[3]!='-'){  text.push("-")  }
      if(i==8 && phone[8]!='-'){  text.push("-")  }
      text.push(phone[i])
    }
    return text.join('')
  }
  render() {
    const {id,pw,cpw,names,sex,phone,mail,open, isChecked} = this.state

    return (
      <div className="register-box">
        <Link to="/Home">
          <button className="logo">Arzt</button>
        </Link>
        <h1>Sign Up</h1>
        <form>
          <div className="int-area">
            <input type="text" name="id" id="id" autoComplete="off" value={id} onChange={this.handleChange} required />
            <label htmlFor="id">ID</label>
          </div>
          <div className="int-area">
            <input  type="password"  name="pw"  id="pw"  autoComplete="off" value={pw}onChange={this.handleChange} required/>
            <label htmlFor="pw">PASSWORD</label>
          </div>
          <div className="int-area">
            <input  type="password"  name="cpw"  id="cpw"  autoComplete="off" value={cpw} onChange={this.handleChange} required/>
            <label htmlFor="cpw">CHECK PASSWORD</label>
          </div>
          <div className="int-area">
            <input  type="text"  name="names"  id="names"  autoComplete="off" value={names} onChange={this.handleChange} required/>
            <label htmlFor="name">NAME</label>
          </div>
          <div className="int-area">
            <input  type="text"  name="sex"  id="sex"  autoComplete="off" value={sex} onFocus={(ex)=>{
                this.openModal()
                this.setState({isFocused: true})
            }} onChange={this.handleChange} required/>
            <label htmlFor="sex">SEX</label>
          </div>
          <div className="int-area">
            <input  type="text"  name="phone"  id="phone"  autoComplete="off" value={phone} onChange={this.isNummer} required/>
            <label htmlFor="phone">PHONE</label>
          </div>
          <div className="int-area">
            <input  type="text"  name="mail"  id="mail"  autoComplete="off" value={mail} onChange={this.handleChange} required/>
            <label htmlFor="mail">E-MAIL</label>
          </div>
          <div className="btn-area">
            <button id="btn" onClick={this.create}>
              CREATE
            </button>
          </div>
        </form>
        <Modal open={open}>
         <div className="Modal-header">What is your gender?</div>
          <div className="Modal-body">
            <input type="checkbox" name= 'male' checked={isChecked.male} onChange={this.setCheck}/><label>Male</label>
            <input type="checkbox" name='female' checked={isChecked.female} onChange={this.setCheck} /><label>Female</label>
          </div>
          <div className="Modal-footer">
            <button className="Modal-btn" size="small" onClick={this.setgender}>Add</button>
            <button className="Modal-btn" size="small" onClick={this.closeModal}>Close</button>
            </div>
        </Modal>
      </div>
    );
  }
}

export default Registers;
