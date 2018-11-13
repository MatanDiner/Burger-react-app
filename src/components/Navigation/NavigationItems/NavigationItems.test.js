import React from 'react';
import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem'

configure({adapter:new Adapter()});

describe('<NavigationItems/>',()=>{

    let warpper;
    beforeEach(()=>{
         warpper = shallow(<NavigationItems/>);
    });

    it('should render two <NavigationItems/> element if not authenticated',()=>{
      expect(warpper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItems/> element if authenticated',()=>{
        //const warpper = shallow(<NavigationItems isAuthenticated/>);
        warpper.setProps({isAuthenticated:true});
        expect(warpper.find(NavigationItem)).toHaveLength(3);
      });

      it('should an exact logout button',()=>{
        warpper.setProps({isAuthenticated:true});
        expect(warpper.contains(<NavigationItem link="/logout">logout</NavigationItem>)).toEqual(true);
      });
});