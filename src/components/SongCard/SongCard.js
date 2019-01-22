import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { addToList, removeFromList } from '../../actions'

const Card = styled.div`
    position: relative;
    border: 1px solid #DDD;
    min-height: 174px;
    min-width: 174px;
    margin: 2px;
    &::after {
        background-image: linear-gradient(180deg,transparent 0,rgba(0,0,0,.35) 50%,rgba(0,0,0,1));
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    } 
`;

const CardDescription = styled.div`
    position: absolute;
    color: white;
    font-size: ${props => props.size || '10'}px;
    left: ${props => props.left}px;
    top: ${props => props.top}px;
    bottom: ${props => props.bottom}px;
    text-shadow: 0 0 10px rgba(0,0,0,.8);
    z-index: 1;
`

const ClickableDescription = styled(CardDescription)`
    cursor: pointer;
`

const LinkDescription = styled(CardDescription)`
    a {
        color: #EEE;
    }
`
class SongCard extends React.Component {

    isSelected(item) {
        return this.props.selection.find(
            (selected) => (
                item.artist + item.name === selected.artist + selected.name
            )
        )
    }

    render() {
        return (
            <Card>
                {this.props.item && this.props.item.image[2]['#text'] && 
                    <img src={this.props.item.image[2]['#text']} alt={this.props.item.name}/>
                }
                
                {!this.isSelected(this.props.item) && 
                    <ClickableDescription
                        left="20"
                        top="20"
                        size="24"
                        onClick={this.props.onAddToList}
                    >Add
                    </ClickableDescription>
                }
                {this.isSelected(this.props.item) && 
                    <ClickableDescription
                        left="20"
                        top="20"
                        size="24"
                        onClick={this.props.onRemoveFromList}
                    >Remove
                    </ClickableDescription>
                }
                <CardDescription
                    left="20"
                    bottom="35"
                    size="14"
                >{this.props.item.artist}
                </CardDescription>

                <LinkDescription
                    left="20"
                    bottom="20"
                >
                    <Link to={`/detail/${this.props.item.artist}/${this.props.item.name}`}>{this.props.item.name}</Link>

                </LinkDescription>
            </Card>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        'onAddToList': () => {
            dispatch(addToList(ownProps.item))
        },
        'onRemoveFromList': () => {
            dispatch(removeFromList(ownProps.item))
        }
    }
}

const mapStateToProps = (state) => {
    return {
        selection: state.selection
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SongCard);