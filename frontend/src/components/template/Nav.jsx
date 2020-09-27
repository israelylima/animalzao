import React from 'react'
import './Nav.css'

import {Link} from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/">
                <i className="fa fa-home"></i> Início
            </Link>
            <Link to="/pets">
                <i className="fa fa-paw"></i> Cadastrar PET
            </Link>
        </nav>
    </aside>