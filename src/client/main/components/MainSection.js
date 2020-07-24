import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addGiraffe } from '../store/action';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { BASE_PATH } from '../constants';

import '../../../scss/MainSection.scss';

import Giraffe from './Giraffe';

require('../../../../uploads/logo.png');

class MainSection extends Component {
    constructor(props){
        super(props)

        this.newGiraffe = this.newGiraffe.bind(this);

        this.state = {
            aviaries: this.props.aviaries,
            numberOfAviaries: [0, 1, 2],
            activeAviary: 0,
            isFillingOpen: false,
            isInfoOpen: false
        }
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if (prevState !== nextProps) {          
            return {
                aviaries: nextProps.aviaries
            }
        }
        return null;
    }
    componentDidMount(){
        fetch(`${BASE_PATH}/giraffes`)
            .then(res => res.json())
            .then(giraffes => {
                giraffes.map(el => {
                    this.props.addGiraffe(
                        el._id, 
                        el.name,
                        Number(el.weight),
                        el.sex,
                        Number(el.height),
                        el.color,
                        el.diet,   
                        el.temper,
                        el.image,
                        el.aviary
                        )
                })
            })
            .catch(err => console.log(err))
    }
    newGiraffe(){
        const newGiraffeForSending = {
            name: 'Имя',
            weight: -1,
            sex: '-',
            height: -1,
            color: '',
            diet: '',
            temper: '',
            image: '',
            aviary: this.state.activeAviary
        }

        fetch(`${BASE_PATH}/giraffe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(newGiraffeForSending)
        })
            .then(res => res.json())
            .then(res => {
                console.log()
                this.props.addGiraffe(res._id, 'Имя', -1, '-', -1, '', '', '', '', this.state.activeAviary)
            })
            .catch(err => console.log(`Error: ${err}`))
        
    }
    render() {
        const { aviaries, isFillingOpen, isInfoOpen, numberOfAviaries, activeAviary } = this.state; 
        const giraffes = aviaries.filter(el => el.aviary === activeAviary);

        let width = {
            width: `0%`
        }
        let height = {
            bottom: `-75px`
        }
        let infoHeight = {
            bottom: `-500px`
        }

        if(aviaries){
            width = {
                width: `${(giraffes.length/7)*100}%`
          };
        }
        if(isFillingOpen){
            height = {
                bottom: `0px`
            }
        }else{
            height = {
                bottom: `-70px`
            }
        }
        if(isInfoOpen){
            if(document.clientWidth < 940){
                infoHeight = {
                    bottom: `10px`
                }
            }else{
                infoHeight = {
                    bottom: `120px`
                }
            }
        }else{
            infoHeight = {
                bottom: `-500px`
            }
        }

        return (
            <div className="main-container main-container-giraffe">
                <div className="aviaries-header">
                    <div className="aviaries-swircher">
                        {
                            numberOfAviaries.map(el => (
                                <div key={el} className={
                                    activeAviary === el
                                    ?
                                    "aviary active-aviary"
                                    :
                                    "aviary"
                                }
                                onClick={() => {
                                    this.setState({
                                        activeAviary: el
                                    })
                                }}
                                >
                                    <h4>Вольер {el+1}</h4>
                                </div>
                            ))
                        }
                        <div className={
                            numberOfAviaries.length < 5
                            ?
                            "addMore"
                            :
                            "disable"
                            } 
                            onClick={() => {
                            if(numberOfAviaries.length < 5){
                                this.setState({
                                    numberOfAviaries: [...numberOfAviaries, numberOfAviaries.length]
                                })
                            }
                        }}> 
                            <i className="fas fa-plus"></i>
                        </div>
                    </div>
                    <div className="personal-info">
                        <i className="far fa-bell"></i>
                        <img src='./img/logo.png' alt="logo"/>
                        <h4>hello@giraffe.com</h4>
                    </div>
                </div>
                <div className="aviaries-body">
                    <div className="aviaries-title">
                        <h1>Жирафы</h1>
                        <div className="addGiraffe" onClick = {this.newGiraffe}>
                            <i className="fas fa-plus"></i>
                        </div>
                    </div> 
                    <div className="giraffes-container">
                        {
                            giraffes
                            ?
                            giraffes.map((el, index) => (
                                <Giraffe 
                                    id = { el.id }  
                                    key = { index }        
                                    img = { el.img }
                                    name = { el.name }
                                    sex = { el.sex }
                                    weight = { el.weight }
                                    height = { el.height }
                                    color = { el.color }
                                    diet = { el.diet }
                                    temper = { el.temper }
                                    />
                            ))
                            :null
                        }
                    </div>
                    <div className="aviary-filling" style={height}>
                        <h2>
                            <span>{((giraffes.length/7)*100).toFixed(0)}%</span>
                            Заполнение вольера
                            </h2>  
                        <div className="progbar-wrapper">
                            <div className="progress">
                                <div className="border">
                                    <div className="fill" style={width}></div>
                                </div>
                            </div>
                            <div className="info" onClick={() => {
                                this.setState({
                                    isInfoOpen: true
                                })
                            }}>
                                <h4>Информация</h4>
                            </div>
                        </div>
                        <div className="closeOrOpen" onClick={() => {
                            this.setState({
                                isFillingOpen: !isFillingOpen
                            })
                        }}>
                            {
                                isFillingOpen
                                ?
                                <i className="fas fa-times"></i>
                                :
                                <i className="fas fa-arrow-up"></i>
                            }
                        </div>
                    </div>
                    <div className="info-container" style={infoHeight}>
                        <div className="title">
                        <h4>
                            Обновления
                        </h4>
                        <i className="fas fa-times" onClick={() => {
                            this.setState({
                                isInfoOpen: false
                            })
                        }}></i>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Дата</th>
                                    <th>Действие</th>
                                    <th>Жираф</th>
                                    <th>Статус</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>01 июня 2020</td>
                                    <td>Новый Жираф</td>
                                    <td>Пряник</td>
                                    <td><span className="awaiting">Ожидается</span></td>
                                </tr>
                                <tr>
                                    <td>20 апр 2020</td>
                                    <td>Новый жираф</td>
                                    <td>Матильда</td>
                                    <td><span className="done">Выполнено</span></td>
                                </tr>
                                <tr>
                                    <td>15 апр 2020</td>
                                    <td>Редактировать</td>
                                    <td>Шнур</td>
                                    <td><span className="notConfermed">Не подтвержден</span></td>
                                </tr>
                                <tr>
                                    <td>05 апр 2020</td>
                                    <td>Удалить</td>
                                    <td>Ракета</td>
                                    <td><span className="done">Выполнено</span></td>
                                </tr>
                                <tr>
                                    <td>04 апр 2020</td>
                                    <td>Перевод</td>
                                    <td>Леонид</td>
                                    <td><span className="rejected">Отклонено</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

MainSection.propTypes={
    aviaries: PropTypes.array
}
MainSection.defaultProps={
    aviaries: []
}


const mapStateProps = (state) => {
    return {
        aviaries: state.aviaries
    };
};

const mapActionToProps = (dispatch) => {
    return {
        addGiraffe: bindActionCreators(addGiraffe, dispatch)
    }
};

export default connect(mapStateProps, mapActionToProps)(MainSection);