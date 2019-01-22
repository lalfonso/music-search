import styled from 'styled-components';
import { HEADER_COLOR } from '../../constants';

export const Header = styled.section`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-around;
    background-color: ${HEADER_COLOR};
    padding: 20px 0;
    margin: 10px 0;
`