import React from 'react';
import { Link } from 'react-router-dom';
import IosWarning from 'react-ionicons/lib/IosWarning';
import { TitleWrapper, CenterScreen } from '../Styled/NoticeWrapper';


function PageNotFound() {
    return (
        <CenterScreen bgColor="#AAA">
            <TitleWrapper>
                <IosWarning fontSize="60px" color="red" shake={true} />
                <h1>Page Not Found</h1>
            </TitleWrapper>
            <Link to="/">Go to Home</Link>
        </CenterScreen>
    )
}

export default PageNotFound;