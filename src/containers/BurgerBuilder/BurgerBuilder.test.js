import React from 'react';
import {BurgerBuilder} from './BurgerBuilder';
import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

configure({adapter:new Adapter()});

describe('<BurgerBuilder/>',()=>{

    let warpper;
    beforeEach(()=>{
         warpper = shallow(<BurgerBuilder onInitIngredients={()=>{}}/>);
    });

it('should render <BuildControls/> when receiving ingredients',()=>{
    warpper.setProps({ings:{salad:0}});
    expect(warpper.find(BuildControls)).toHaveLength(1);
});

});
