import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';

import SongsList from './SongsList';
import SongCard from '../SongCard/SongCard';


configure({ adapter: new Adapter() });

describe('<SongsList />', () => {

    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<SongsList />);
    })

    it('should contain a list of <SongCard />', () => {
        wrapper.setProps({
            list: [
                {
                    artist: 'a1',
                    name: 'n1'
                },
                {
                    artist: 'a2',
                    name: 'n2'
                }
            ]
        });

        expect(wrapper.find(SongCard)).toHaveLength(2);
    })

    it('should set a valid key for <SongCard />', () => {
        wrapper.setProps({
            list: [
                {
                    artist: 'a1',
                    name: 'n1'
                }
            ]
        });

        expect(wrapper.find(SongCard).key()).toBe('a1 n1');
    })

    it('should not contain <SongCard /> element when the list is empty', () => {
        wrapper.setProps({
            list: []
        });
        expect(wrapper.find(SongCard)).toHaveLength(0);
    })

    it('should not contain <SongCard /> element when there is no list', () => {
        const wrapper = shallow(<SongsList />);

        expect(wrapper.find(SongCard)).toHaveLength(0);
    })
});
