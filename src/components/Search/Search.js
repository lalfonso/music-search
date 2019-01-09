import React, { Component } from 'react';
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

let timeout;

class Search extends Component {

    constructor(props) {
        super(props);
    }

    handleOnChange = (e) => {
        if (timeout) { clearTimeout(timeout); }
        const str = e.target.value;
        timeout = setTimeout(() => {
            this.props.onChangeValue(str);
        }, this.props.debunce);
    }

    render() {
        return (
            <SearchContainer>
                <Title>
                    {this.props.titleText}
                </Title>
                <Input type="text"
                    placeholder={this.props.placeholder}
                    onChange={this.handleOnChange}
                />
            </SearchContainer>
        )
    }

}

export default Search;