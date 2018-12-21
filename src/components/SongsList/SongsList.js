import React from 'react';
import SongCard from '../SongCard/SongCard'
import styled from 'styled-components';

const ListWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

function SongsList(props) {
    console.log(props)
    return (
        <ListWrapper>
            {props.list.map((item, idx) =>
                <SongCard
                    key={idx}
                    name={item.name}
                    artist={item.artist}
                    url={item.url}
                    img={item.image[2]['#text']}
                ></SongCard>
            )}
        </ListWrapper>
    )
}

export default SongsList;