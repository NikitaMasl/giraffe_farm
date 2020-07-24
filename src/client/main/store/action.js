import { ADD_GIRAFFE } from './constants';
import { REMOVE_GIRAFFE } from './constants';
import { EDIT_GIRAFFE } from './constants';

export const addGiraffe = ( id, name, weight, sex, height, color, diet, temper, img, aviary ) => {
    return {
        type: ADD_GIRAFFE,
        id,
        name, 
        weight, 
        sex, 
        height, 
        color, 
        diet, 
        temper,
        img,
        aviary
    }
}

export const removeGiraffe = (id) => {
    return {
        type: REMOVE_GIRAFFE,
        id
    }
}

export const editGirraffe = ( id, name, weight, sex, height, color, diet, temper, img ) => {
    return {
        type: EDIT_GIRAFFE,
        id,
        name, 
        weight, 
        sex, 
        height, 
        color, 
        diet, 
        temper,
        img
    }
}

