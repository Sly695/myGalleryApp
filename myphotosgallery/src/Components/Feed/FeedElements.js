import styled from 'styled-components';

export const PicturesUsername = styled.p`
    font-weight: bold;
    margin-right: 5px;
`;

export const PicturesDetails = styled.div`
    display: flex;
    position: relative;
`;


export const PicturesDesc = styled.p``;

export const PictureDate = styled.p``;

export const CardLogo = styled.div`
    display: flex;
    justify-content: space-around;
    width: 20px;
    margin-left: 7px;
    margin-top: 3px;
`;

export const FeedContainer = styled.div`
    position: relative;
    top: 80px;
    height: 0;
    background-color: #fee6af;
`;

export const FeedMenu = styled.div`
    display: flex;
    justify-content: center;
    margin: 5%;
    flex-wrap: wrap;
`;


export const UploadContainer = styled.div`
    background: rgb(232,249,242);
    background-color: #E8F9F2;
    height: 300px;
`;

export const FeedTitle = styled.p`
    padding-top: 50px;
    font-size: 30px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    color: #01bf71;
    font-family: 'Arial Black', Gadget, sans-serif;
`;

export const FeedInfo = styled.div`
    display: flex;
    justify-content: center;
    margin: 5%;
    flex-wrap: wrap;
`;

export const ButtonStyledBis = styled.button`
    border-radius: 50px;
    background: ${({ primary }) => (primary ? '#01BF71' : '#010606')};
    white-space: nowrap;
    padding: ${({ big }) => (big ? '14px 48px' : '12px 30px')};
    color: ${({ dark }) => (dark ? '#010606' : '#fff')};
    font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
    outline: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;
    marginLeft: 10px;
    
    &:hover {
        transition: all 0.2s ease-in-out;
        background: ${({ primary }) =>
        (primary ? '#fff' : '#01BF71')};
        color: ${({ primary }) => primary ? "#01BF71" : 'black'}
    }

`;


