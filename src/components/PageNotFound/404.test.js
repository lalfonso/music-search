import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import PageNotFound from './404';
import IosWarning from 'react-ionicons/lib/IosWarning';

configure({ adapter: new Adapter() })

describe('<404 />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<PageNotFound />);
    })

    it('should contain a ios warning component', () => {
        expect(wrapper.find(IosWarning)).toHaveLength(1);
    })

    it('should contain a warning message on h1 tag', () => {
        expect(wrapper.find('h1').text()).toBe('Page Not Found')
    })
})