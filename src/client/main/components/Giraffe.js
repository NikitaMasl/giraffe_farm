import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { removeGiraffe, editGirraffe } from '../store/action';
import { bindActionCreators } from 'redux';
import { BASE_PATH } from '../constants';

import '../../../scss/Giraffe.scss';
import UploadExample from './UploadExample'

class Giraffe extends Component {
    constructor(props){
        super(props)

        this.addNewValueToState = this.addNewValueToState.bind(this);
        this.getImgName = this.getImgName.bind(this);
        this.saveGiraffe = this.saveGiraffe.bind(this);
        this.sendReqForRem = this.sendReqForRem.bind(this);
        this.lengthControlFoo = this.lengthControlFoo.bind(this);

        this.state = {
            img: this.props.img,
            name: this.props.name,
            sex: this.props.sex,
            weight: this.props.weight,
            height: this.props.height,
            color: this.props.color,
            diet: this.props.diet,
            temper: this.props.temper,
            id: this.props.id,
            isEditOpen: false,
            isCorrecting: false,

            new_img: '',
            new_name: '',
            new_sex: '',
            new_weight: '',
            new_height: '',
            new_color: '',
            new_diet: '',
            new_temper: ''
        }
    }
    static getDerivedStateFromProps(nextProps, prevState){
        if (prevState !== nextProps) {
            if(nextProps.name === 'Имя'){
                return {
                    img: nextProps.img,
                    name: nextProps.name,
                    sex: nextProps.sex,
                    weight: nextProps.weight,
                    height: nextProps.height,
                    color: nextProps.color,
                    diet: nextProps.diet,
                    temper: nextProps.temper,
                    id: nextProps.id,
                    isCorrecting: true
                }
            }else{
                return {
                    img: nextProps.img,
                    name: nextProps.name,
                    sex: nextProps.sex,
                    weight: nextProps.weight,
                    height: nextProps.height,
                    color: nextProps.color,
                    diet: nextProps.diet,
                    temper: nextProps.temper,
                    id: nextProps.id
                }
            }
        }
        return null;
    }

    getImgName(value){
        this.setState({
            new_img: value,
            img: value
        })
    }

    addNewValueToState(e){
        e.persist()

        this.setState((state) => {
            switch (e.target.getAttribute('name')) {
                case 'new_name':
                    return {new_name: e.target.innerHTML}
                case 'new_sex':
                    return {new_sex: e.target.innerHTML}
                case 'new_weight':
                    return {new_weight: e.target.innerHTML}
                case 'new_height':
                    return {new_height: e.target.innerHTML}
                case 'new_color':
                    return {new_color: e.target.innerHTML}
                case 'new_diet':
                    return {new_diet: e.target.innerHTML}
                case 'new_temper':
                    return {new_temper: e.target.innerHTML}
                default:
                    break;
            }
        });
    }
    saveGiraffe(){
        const { id, new_img, new_name, new_sex, new_weight, new_height, new_color, new_diet, new_temper } = this.state

        const newGiraffeForSending = {

        }
        if(new_img){
            newGiraffeForSending.image = new_img
        }
        if(new_name){
            newGiraffeForSending.name = new_name
        }
        if(new_sex){
            newGiraffeForSending.sex = new_sex
        }
        if(new_weight){
            newGiraffeForSending.weight = new_weight
        }
        if(new_height){
            newGiraffeForSending.height = new_height
        }
        if(new_color){
            newGiraffeForSending.color = new_color
        }
        if(new_diet){
            newGiraffeForSending.diet = new_diet   
        }
        if(new_temper){
            newGiraffeForSending.temper = new_temper
        }

        fetch(`${BASE_PATH}/giraffe/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(newGiraffeForSending)
        })
            .then(res => res.json())
            .catch(err => console.log(`Error: ${err}`))

        this.props.editGirraffe( id, new_name, new_weight, new_sex, new_height, new_color, new_diet, new_temper, new_img )
    }

    sendReqForRem(){
        const { id } = this.state

        fetch(`${BASE_PATH}/giraffe/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
              }
        })
            .then(res => res)
            .catch(err => console.log(`Error: ${err}`))

        this.setState({
            isCorrecting: false,
            isEditOpen: false
        })
        this.props.removeGiraffe(id)
    }
    lengthControlFoo(e){
        let maxLength = Number(e.target.getAttribute('maxLength'));

        if(e.keyCode !== 8 && e.target.innerHTML.length > maxLength){
            e.preventDefault();
        }else{
            if(e.target.getAttribute('name') === 'new_weight' || e.target.getAttribute('name') === 'new_height'){
                if(e.keyCode < 48 || e.keyCode > 57 ){
                    if(e.keyCode !== 8 && e.keyCode !== 190 && e.keyCode !== 188){
                        e.preventDefault()
                    }else{
                        if(e.key === 'ю' || e.key === 'б' || e.key === 'Б' || e.key === 'Ю'){
                            e.preventDefault()
                        }
                    }
                }
            }
        }
    }

    render() {
        const { id, img, name, sex, weight, height, color, diet, temper, isEditOpen, isCorrecting, new_name } = this.state;

        if(img){
            require(`../../../../uploads/${img}`)
        }

        return (
            <div className={
                isCorrecting
                ?
                "giraffe-container shadow"
                :
                "giraffe-container"
                }>
                <div className="img-container">
                    {
                        isCorrecting 
                        ?
                        <UploadExample getImgName={this.getImgName} image={img}/>
                        :
                            img
                            ?
                            <img src={`./img/${img}`} alt="giraffe foto"/>
                            :
                            <div>
                                <i className="fas fa-camera"></i>
                            </div>
                    }
                </div>
                <div className="name">
                    <h2 suppressContentEditableWarning={true} contentEditable={
                        isCorrecting 
                        ?true
                        :false
                    } onKeyDown={this.lengthControlFoo} name = "new_name" maxLength="10" onKeyUp={this.addNewValueToState}>
                        {name}
                    </h2>
                </div>
                <div className="params">
                    <div className='params-icons'>
                        <i className="fas fa-venus-mars"></i>
                        <i className="fas fa-balance-scale"></i>
                        <i className="fas fa-ruler-vertical"></i>
                    </div>
                    <div className="params-value">
                        <h3 suppressContentEditableWarning={true} contentEditable={
                            isCorrecting 
                            ?"plaintext-only"
                            :false
                            } onKeyDown={this.lengthControlFoo} name = "new_sex" maxLength="0" onKeyUp={this.addNewValueToState} >
                            {sex}
                        </h3>
                        <h3 suppressContentEditableWarning={true} contentEditable={
                            isCorrecting 
                            ?true
                            :false
                            } onKeyDown={this.lengthControlFoo} name = "new_weight" maxLength="3" onKeyUp={this.addNewValueToState} >
                            {
                                weight === -1
                                ?
                                '-'
                                :
                                weight
                            }
                        </h3>
                        <h3 suppressContentEditableWarning={true} contentEditable={
                                isCorrecting 
                                ?true
                                :false
                            } onKeyDown={this.lengthControlFoo} name = "new_height" maxLength="4" onKeyUp={this.addNewValueToState}>
                            {
                                height === -1
                                ?
                                '-'
                                :
                                height
                            }
                        </h3>
                    </div>
                </div>
                <div className="info">
                    <h4>
                        Цвет:
                        <span suppressContentEditableWarning={true} contentEditable={
                                isCorrecting
                                ?true
                                :false
                            } onKeyDown={this.lengthControlFoo} name = "new_color" maxLength="10" onKeyUp={this.addNewValueToState}>
                            {color}
                        </span>
                    </h4>
                    <h4>
                        Диета:
                        <span suppressContentEditableWarning={true} contentEditable={
                                isCorrecting
                                ?true
                                :false
                            } onKeyDown={this.lengthControlFoo} name = "new_diet" maxLength="12" onKeyUp={this.addNewValueToState}>{diet}</span>
                    </h4>
                    <h4>
                        Характер:
                        <span suppressContentEditableWarning={true} contentEditable={
                                isCorrecting
                                ?true
                                :false
                            } onKeyDown={this.lengthControlFoo} name = "new_temper" maxLength="12" onKeyUp={this.addNewValueToState}>{temper}</span>
                    </h4>
                </div>
                <div className="edit" onClick={() => {
                        this.setState({
                            isEditOpen: !isEditOpen
                        })
                    }
                }>
                    <i className="fas fa-ellipsis-h"></i>
                </div>
                {
                    isCorrecting || name === 'Имя'
                    ?
                    <div className={
                        name === 'Имя' && isCorrecting && new_name === ''
                        ?"save-btn-container disabled"
                        :"save-btn-container"
                        } 
                        onClick={
                            () => {
                            if( name !== 'Имя' || new_name !== '' ) {   
                                this.saveGiraffe()
                                this.setState({
                                    isCorrecting: false
                                })
                            }
                        }}>
                        <h4>Сохранить</h4>
                    </div>
                    :null
                }
                {
                isEditOpen
                ?
                <div className="edit-window">
                    <div className="edit-btn" onClick={() => {
                        this.setState({
                            isEditOpen: false,
                            isCorrecting: true
                        })
                    }}>
                        <i className="fas fa-pencil-alt"></i>
                        <h4>Редактировать</h4>
                    </div>
                    <div className="delite" onClick={this.sendReqForRem}>
                        <i className="fas fa-trash-alt"></i>
                        <h4>Удалить</h4>
                    </div>
                </div>
                :null
                }
            </div>
        )
    }
}

Giraffe.propTypes={
    img: PropTypes.string,
    name: PropTypes.string,
    sex: PropTypes.string,
    color: PropTypes.string,
    diet: PropTypes.string,
    character: PropTypes.string,
    id: PropTypes.string,
    activeAviary: PropTypes.number
}
Giraffe.defaultProps={
    img: '',
    name: '',
    sex: '',
    weight: 0,
    height: 0,
    color: '',
    diet: '',
    character: '',
    id: '',
    activeAviary: 1
}

const mapActionToProps = (dispatch) => {
    return {
        removeGiraffe: bindActionCreators(removeGiraffe, dispatch),
        editGirraffe: bindActionCreators(editGirraffe, dispatch)
    }
};

export default connect(null, mapActionToProps)(Giraffe);