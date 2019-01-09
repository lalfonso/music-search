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
                    item={item}
                ></SongCard>
            )}
        </ListWrapper>
    )
}

export default SongsList;