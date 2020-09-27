import React from 'react'
import './Header.css'
import {Link} from 'react-router-dom' 
import perfil from '../../assets/imgs/perfil.jpg'


export default props =>
    <header className="header d-none d-sm-flex flex-column text-right ">
        <ul class="perfil">
            
            <img className=" fotoperfil rounded-circle" src={perfil} alt="perfil"/>
            <Link className="" to="/">Helena Aragão</Link>
        </ul>
    </header>