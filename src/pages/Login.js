import React from 'react'
import Logins from '../moduls/login/Logins'
import '../app.scss'

const Login = () => {
    return (
        <div className='App'>
            <div className='body'>
                <Logins/>
            </div>
            <div className='footer'>
                by 장민식팀
                </div>
        </div>
    )
}

export default Login