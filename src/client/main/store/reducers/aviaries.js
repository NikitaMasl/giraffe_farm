import { ADD_GIRAFFE } from '../constants';
import { REMOVE_GIRAFFE } from '../constants';
import { EDIT_GIRAFFE } from '../constants';


const AVIARIES = {
        aviaries:  [],
    }

export const aviaries = (state = AVIARIES.aviaries, { type, id, name, weight, sex, height, color, diet, temper, img }) => {
    switch (type){
        case ADD_GIRAFFE:
            return [{
                id: id,
                name: name, 
                weight: weight, 
                sex: sex, 
                height: height, 
                color: color, 
                diet: diet, 
                temper: temper,
                img: img
            }, ...state]
        case REMOVE_GIRAFFE:
            return state.filter(el => el.id !== id)
        case EDIT_GIRAFFE:
            return state.map(el => {
                if(el.id === id){
                    if(name){
                        el.name = name
                    }
                    if(weight){
                        el.weight = weight
                    }
                    if(sex){
                        el.sex = sex
                    }
                    if(height){
                        el.height = height
                    }
                    if(color){
                        el.color = color
                    }
                    if(diet){
                        el.diet = diet
                    }
                    if(temper){
                        el.temper = temper
                    }
                    if(img){
                        el.img = img
                    }
                    return el
                }else{
                    return el
                }
            })
        default:
            return state;
    }
}