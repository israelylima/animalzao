import React from 'react'
import './home.css'
import Main from '../template/Main'
import imgcard1 from '../../assets/imgs/imgcard1.jpg'

export default props =>
<Main>
    <div className="titulo">Olá, nós somos a Animalzão</div>
    <hr />
    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12" data-category="view">
        <div class="lib-panel">
            <div class="row box-shadow">
                <div class="col-md-6">
                    <img src={imgcard1} alt="imgcard1"/>                        
                </div>
                <div class="col-md-6">
                    <div class="lib-row lib-header">
                        14 Fatos sobre o Buldogue Francês
                        <div class="lib-header-seperator"></div>
                    </div>
                    <div class="lib-row lib-desc">
                         O buldogue francês é uma raça de cão robusta e compacta com uma cabeça grande, focinho curto e orelhas semelhantes a morcegos.
                    </div>
                </div>
            </div>
        </div>
    </div>    
    
</Main>
