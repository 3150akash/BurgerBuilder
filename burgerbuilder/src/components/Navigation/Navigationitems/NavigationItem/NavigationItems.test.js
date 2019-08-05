import  React from 'react';
import Enzyme ,{shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import NavigationItems from './NavigationItem';
import NavigationItem from '../NavigationItem/NavigationItem';

Enzyme.configure({adapter: new Adapter()});

describe('<NavigationItems />',() =>{
     it('should render two <NavigationItem /> element  if not authenitacted', () =>{
        const wrapper = shallow(<NavigationItems />);
        //call when 2 time not authentiacated
        expect(wrapper.find(NavigationItem).toHaveLength(2));
    });
}) ; 