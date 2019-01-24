import React, { Component, Fragment} from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
    margin: 0 20%;
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

    componentDidMount() {
        this.inputSearch.focus();
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
            <Fragment>
                <SearchContainer>
                    <Title>
                        {this.props.titleText}
                        {this.props.searching? ' Searching...':''}
                    </Title>
                    <Input type="text"
                        placeholder={this.props.placeholder}
                        onChange={this.handleOnChange}
                        defaultValue={this.props.queryString}
                        ref={ (inp) => this.inputSearch = inp}
                    />
                </SearchContainer>
                {this.props.children}
            </Fragment>
        )
    }

}

export default Search;