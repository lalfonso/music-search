import styled from 'styled-components';

const CenterScreen = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    min-height: 100vh;
    background-color: ${props => props.bgColor || 'white'};
`

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export {TitleWrapper, CenterScreen};