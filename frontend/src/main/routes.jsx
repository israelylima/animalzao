import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/home'
import PetsCrud from '../components/pets/pets-crud'

/*Mapeamento dos links aos componentes*/
export default props =>
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/pets" component={PetsCrud} />
        <Redirect from="*" to="/" />
    </Switch>


