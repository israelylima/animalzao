import React from 'react'
import Main from '../template/Main'

import axios from 'axios'

const headerProps = {
    icon: 'pets',
    title: 'Pets',
    subtitle: 'Cadastro de Pets'
}

const baseUrl = 'http://localhost:3001/pets'
const initState= {
    pets: { nome:'', especie:'', raca:'', dataNasc:'', dono:''},
    list: []
}

export default class PetsCrud extends React.Component{

    state = { ...initState }

    /**Chamada quando o elemento for exibido na tela */
    componentWillMount() {
        axios.get(baseUrl,{           
            crossdomain: true
        })
        .then(resp => {
            this.setState({ list: resp.data })/**salvamos dentro da lista as requisições */
        })        
    }


    /*Limpar formulario */
    clear() {
        this.setState({ pets: initState.pets })
    }

    /* Verificar se há campos vazios*/
    verificaCampoVazio() {
        if ( this.state.pets.nome == "" ||
        this.state.pets.especie == "" ||
        this.state.pets.raca == "" ||
        this.state.pets.dataNasc == "" ||
        this.state.pets.dono == "" ) {
            return true
        }
        else {
            return false
        }
    }

    save() {
        if ( this.verificaCampoVazio()==true ) {
            alert("Por favor, preencha os campos corretamente.");
        } else {

            const pets = this.state.pets  // PEGA O ESTADO atual  
            const method = pets.id ? 'put' : 'post'
            const url = pets.id ? `${baseUrl}/${pets.id}` : baseUrl
            var config = {
                headers: {crossdomain: true}
            };
            axios[method](url,pets,config)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ pets: initState.pets, list })  
                console.log(resp.data)         
            })
            .catch(error => {
                console.log(error)
            })
        }

    }
    getUpdatedList(pets){       
        const list = this.state.list.filter(p => p.id !== pets.id) /**removendo o usuario da lista */
        list.unshift(pets) /**inserindo na primeira posição do array */
        return list
    }

    updatefield(event) {
        const pets = { ...this.state.pets }
        pets[event.target.name] = event.target.value /**em target pegamos o conteúdo de input name */
        this.setState({ pets })
    }
    renderForm(){
        /**jsx que ira renderizar o formulário */
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="nome">Nome do pet</label>
                            <input type="text" className="form-control" 
                                name="nome" 
                                value={this.state.pets.nome}
                                onChange={e => this.updatefield(e)}
                                placeholder="Digite o nome.."
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="especie">Espécie</label>
                            <input type="text" className="form-control" 
                                name="especie" 
                                value={this.state.pets.especie}
                                onChange={e => this.updatefield(e)}
                                placeholder="Digite a espécie.."
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="raca">Raça</label>
                            <input type="text" className="form-control" 
                                name="raca" 
                                value={this.state.pets.raca}
                                onChange={e => this.updatefield(e)}
                                placeholder="Digite a raça.."
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dataNasc">Data de nascimento</label>
                            <input type="text" className="form-control"
                                name="dataNasc"
                                value={this.state.pets.dataNasc}
                                onChange={e => this.updatefield(e)}
                                placeholder="Digite a data de nascimento.."
                                />
                        </div>
                        <div className="form-group">
                            <label htmlFor="dono">Dono</label>
                            <input type="text" className="form-control"
                                name="dono"
                                value={this.state.pets.dono}
                                onChange={e => this.updatefield(e)}
                                placeholder="Digite o nome do Dono.."
                                />
                        </div>
                    </div>
                </div>

                <hr />


                <div className="row">
                    <div className="col-12 d-flex justify-content end">
                        <button className="btn btn-primary"
                        onClick={e => this.save(e)}>Salvar</button>
                        <button className="btn btn-secondary ml-2"
                        onClick={e => this.clear(e)}>Cancelar</button>
                    </div>
                </div>

            </div>
        );
    }


    /**edição */
    load(pets){
        this.setState({ pets })/**atualiza o estado da aplicação. */
    }
    remove(pets){
        axios.delete(`${baseUrl}/${pets.id}`)
        .then(resp => {
            const list = this.state.list.filter(p => p !== pets)
            this.setState({ list })
        })
    }

    /**list petss */
    rendertable(){
        return(
            <table className="table mt-4">
               <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Espécie</th>
                        <th>Raça</th>
                        <th>Data de Nascimento</th>
                        <th>Dono</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderows()}
                </tbody>            
            </table>
        );
    }
    renderows(){
        /**mapeando usuários que estão no estado do objeto */
        return this.state.list.map((pets,index) => {
            return (                
                <tr key={index}>
                    <td>{pets.nome}</td>
                    <td>{pets.especie}</td>
                    <td>{pets.raca}</td>
                    <td>{pets.dataNasc}</td>
                    <td>{pets.dono}</td>
                    <td>
                        <button className="btn btn-warning mr-2"
                        onClick={() => this.load(pets)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger"
                        onClick={() => this.remove(pets)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            );
        })
    }



    render(){        
        return(            
            <Main {...headerProps}>
                
                {this.renderForm()}
                {this.rendertable()}

            </Main>
        );
    }
}