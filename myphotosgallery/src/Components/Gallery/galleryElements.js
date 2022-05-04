import styled from 'styled-components';


export const PicturesContainer = styled.div`
    position: relative;
    top: 80px;
    height: 0;
    background-color: #fee6af;

`;

export const PicturesItems = styled.img`
    width: 250px;
    height: 250px;
    object-fit: cover;
    margin: 10px;
`;

export const PicturesMenu = styled.div`
    display: flex;
    justify-content: center;
    margin: 5%;
    flex-wrap: wrap;
`;

export const PicturesTitle = styled.h3`
    padding-top: 50px;
    font-size: 30px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    color: #01bf71;
    font-family: 'Arial Black', Gadget, sans-serif;


`;

export const PicturesWrap = styled.div`
    display: flex;
    justify-content: space-around;
    

`;

export const UploadContainer = styled.div`
    background: rgb(232,249,242);
    background-color: #E8F9F2;
`;

export const PicturesForm = styled.div`
    display: flex;
    justify-content: center;
    

    @media screen and (max-width: 768px) {
        flex-direction: column;
    }

`;

export const PicturesInput = styled.input`
    margin-bottom: 3%;
    border-radius: 50px;
    border-color: #01bf71;
    text-align: center;
    outline: block;
    border: block;
    white-space: nowrap;
    padding: ${({ big }) => (big ? '14px 48px' : '12px 30px')};
`;

export const PicturesInfo = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    padding-bottom: 50px;

    @media screen and (min-width: 768px) {
        margin-right: 130px;
        justify-content: flex-end;
    }

`;

export const MenuP = styled.a`
`

export const CardLogo = styled.div`
    display: flex;
    justify-content: space-around;
    width: 20px;
    margin-left: 7px;
    margin-top: 3px;
`;

export const PicturesDesc = styled.p`
    cursor: pointer;
`;

export const PicturesUsername = styled.p`
    font-weight: bold;
    margin-right: 5px;
    color: #01bf71;
`;

export const PicturesDetails = styled.div`
    display: flex;
    position: relative;
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

export const PictureDate = styled.p`
    color: #CCCCCC;
`;

