import styled from 'styled-components';

export const Button = styled.div`
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    width: ${props => props.width || "auto"};
    height: 6px;
    line-height: 6px;
`