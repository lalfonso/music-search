import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
    position: relative;
    border: 1px solid #DDD;
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
            <img src={props.img} />
            <CardDescription
                left="20"
                bottom="35"
                size="14"
            >{props.artist}
            </CardDescription>

            <LinkDescription
                left="20"
                bottom="20"
            ><a href={props.url}>{props.name}</a>
            </LinkDescription>

        </Card>
    )
}



export default SongCard;