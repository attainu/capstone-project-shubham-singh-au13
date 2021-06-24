import { combineReducers } from "redux";
import Profile from "./Profile";
import Token from "./token";
import Type from './Type';
import SingleAdminMedicine from './singleMedicine';
import Allmedicine from './AllMedicine';
import Loder from './Loder';

export default combineReducers({
    Profile,
    Token,
    Type,
    SingleAdminMedicine,
    Allmedicine,
    Loder
})


