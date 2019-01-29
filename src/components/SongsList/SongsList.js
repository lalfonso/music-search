import React from 'react';
import SongCard from '../SongCard/SongCard'
import styled from 'styled-components';

const ListWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
`;

const ViewMoreCard = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    position: relative;
    border: 1px solid #DDD;
    min-height: 174px;
    min-width: 174px;
    margin: 2px;
    background-color: green;
    color: white;
    cursor: pointer;
    &:hover {
        background-color: #002900f2
    } 
    div {
        display: flex;
        margin: 0 auto;
        align-items: center;

    }
`

function SongsList({ list, viewMore, searching }) {
    return (
        <ListWrapper>
            {list && list.map((item, idx) =>
                <SongCard
                    key={`${item.artist} ${item.name}`}
                    item={item}
                ></SongCard>
            )}

            {list && list.length % 50 === 0 && list.length > 0 &&
                <ViewMoreCard onClick={viewMore}>
                    {searching ?
                        <div>Loading...</div> :
                        <div>View More >></div>
                    }
                </ViewMoreCard>
            }
        </ListWrapper>
    )
}

export default SongsList;