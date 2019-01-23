import React, { Fragment } from 'react';
import styled from 'styled-components';

const Footer = styled.section`
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: red;
    color: white;
    text-align: center;
    height: ${props => props.height ? props.height + 'px' : 'auto'};
    line-height: ${props => props.height ? props.height + 'px' : 'auto'};
    z-index: 1;
`

const withFooter = (WrapperComponent, height) => (
    (props) => (
        <Fragment>
            <WrapperComponent {...props} />
            <Footer height={height}>
                Footer
            </Footer>
        </Fragment>
    )
)

export default withFooter;