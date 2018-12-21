import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
    margin: 0 auto;
    width: 40%;
`;

const Title = styled.h1`
    color: #BBB;
`;

const Input = styled.input`
    width: 98%;
    height: 30px;
    padding-left: 10px;
    border: 2px #BBB solid;
`;


function Search(props) {
    return (
        <SearchContainer>
            <Title>
                Music Search
            </Title>
            <Input type="text"
                placeholder={props.placeholder}
                onChange={props.onChangeValue}
            />
        </SearchContainer>
    )
}

export default Search;