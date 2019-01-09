import React from 'react';
import styled from 'styled-components';
import Detail from '../Detail/Detail';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


const Card = styled.div`
    position: relative;
    border: 1px solid #DDD;
    min-height: 174px;
    min-width: 174px;
    &::after {
        background-image: linear-gradient(180deg,transparent 0,rgba(0,0,0,.35) 70%,rgba(0,0,0,.7));
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
    font-size: ${props => props.size | '10'}px;
    left: ${props => props.left}px;
    bottom: ${props => props.bottom}px;
    text-shadow: 0 0 10px rgba(0,0,0,.8);
    z-index: 1;
`

const LinkDescription = styled(CardDescription)`
    a {
        color: #EEE;
    }
`

function SongCard(props) {
    return (
        <Card>
            {props.item && props.item.image[2]['#text'] && <img src={props.item.image[2]['#text']} />}
            <CardDescription
                left="20"
                bottom="35"
                size="14"
            >{props.item.artist}
            </CardDescription>

            <LinkDescription
                left="20"
                bottom="20"
            >
                <Link to={`/detail/${props.item.artist}/${props.item.name}`}>{props.item.name}</Link>
           
            </LinkDescription>

            

        </Card>
    )
}



export default SongCard;