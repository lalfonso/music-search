import React from 'react';
import SongCard from '../SongCard/SongCard'
import styled from 'styled-components';

const ListWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`;

function SongsList(props) {
    return (
        <ListWrapper>
            {props.list && props.list.map((item, idx) =>
                <SongCard
                    key={`${item.artist} ${item.name}`}
                    item={item}
                ></SongCard>
            )}
            {props.children}
        </ListWrapper>
    )
}

export default SongsList;