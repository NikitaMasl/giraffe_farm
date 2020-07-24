import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import '../../../scss/NavBar.scss';
require('../../../../uploads/logo.png');

function AppLink(props){
    return(
        <li>
            <NavLink {...props} activeClassName="activeLink"/> 
        </li>
    )
}

export default class NavBar extends Component {
    constructor(props){
        super(props)

        this.changeIsMenuOpen = this.changeIsMenuOpen.bind(this);

        this.state={
            isMenuOpen: false
        }
    }
    changeIsMenuOpen(){
        this.setState({
            isMenuOpen: !this.state.isMenuOpen
        })
    }
    render() {
        const { isMenuOpen } = this.state
        return (
            <div className="navbar-container">   
                <div className="logo">
                    <img src='./img/logo.png' alt="logo"/>
                    <div className="logo-text">
                        <h4>Ферма Заслуженных Жирафов</h4>
                        <p>России и СНГ</p>
                    </div>
                </div> 
                {
                    isMenuOpen
                    ?null
                    :
                    <label className="open" htmlFor="menu" onClick={this.changeIsMenuOpen} >
                        <i className="fa fa-bars" ></i>
                    </label>
                }
                <nav className={
                    isMenuOpen
                    ?"menuopen"
                    :""
                }>
                    <ul>
                        <AppLink exact to='/'><i className="fas fa-home"></i>Главная</AppLink>
                        <AppLink to='/manage'><i className="fas fa-tasks"></i>Управление</AppLink>
                        <AppLink to='/giraffe'><i className="fas fa-horse-head"></i>Жирафы</AppLink>
                        <AppLink to='/staf'><i className="fas fa-user-friends"></i>Сотрудники</AppLink>
                        <AppLink to='/settings'><i className="fas fa-cog"></i>Настройки</AppLink>
                        <AppLink to='/support'><i className="fas fa-tools"></i>Поддержка</AppLink>
                    </ul>
                </nav>
                {
                    isMenuOpen
                    ?
                    <label className="close" htmlFor="menu" onClick={this.changeIsMenuOpen} >
                        <i className="far fa-times-circle"></i>
                    </label>
                    :null
                }
            </div>
        )
    }
}
