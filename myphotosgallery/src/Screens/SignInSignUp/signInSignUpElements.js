import styled from 'styled-components';

export const Gallery = styled.div`

    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    margin: auto;
`;

export const GalleryErrorMessage = styled.p`
    color: red;
    text-align: center;
    flex-wrap: wrap;
`;

export const ImgGallery = styled.img`
    width: 30%;
    display: flex;
    justify-content: center;
    margin: auto;

    &:hover {
        transform: scale(1.02);
        transition: all 0.2s ease-in-out;
        cursor: pointer;
    }

`;

export const Column1 = styled.div`
    width: 50%;
    height: 100vh;
    display: flex;
    margin: auto;
    justify-content: center;
    flex-direction: column;

    @media screen and (max-width: 768px) {
        width: 100%;
    }
`;

export const Column2 = styled.div`
    display: flex;
    width: 50%;
    height: 100vh;

    @media screen and (max-width: 768px) {
        width: 100%;
    }
`;

export const GalleryContainer = styled.div`
    display: flex;

    @media screen and (max-width: 768px) {
        flex-direction: column;
    }
`;

export const TextGallery = styled.h1`
    text-align: center;
    font-size: 1rem;
    color: #01bf71;
    font-weight: bold;
    text-decoration: none;
    font-family: 'Arial Black', Gadget, sans-serif;

    &:hover {
        transform: scale(1.02);
        transition: all 0.2s ease-in-out;
        cursor: pointer;
    }

    @media screen and (max-width: 768px) {
        color: #000;
    }
`;

////////////////////////////////////////// SIGN IN

export const GallerySignIn = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

export const GalleryTitle = styled.h1`
    text-align: center;
    font-size: 2rem;
    color: #01bf71;
    font-family: 'Arial Black', Gadget, sans-serif;

    &:hover {
        transform: scale(1.02);
        transition: all 0.2s ease-in-out;
        cursor: pointer;
    }

`;

export const GallerySignInInputEmail = styled.input`
    margin-bottom: 3%;
    border-radius: 50px;
    border-color: #01bf71;
    text-align: center;
    outline: none;
    border: none;
    white-space: nowrap;
    padding: ${({big}) => (big ? '14px 48px' : '12px 30px')};
`;

export const GallerySignInInputPassWord = styled.input`
    margin-bottom: 3%;
    border-radius: 50px;
    border-color: #01bf71;
    text-align: center;
    outline: none;
    border: none;
    white-space: nowrap;
    padding: ${({ big }) => (big ? '14px 48px' : '12px 30px')};
`;

export const GallerySignInTitle = styled.h2`
    font-size: 2rem;
    text-align: center;
    color: #000;
    font-family: 'Arial Black', Gadget, sans-serif;



`;

export const GallerySignUp = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`;



////////////////////////////////////////// SIGN UP

export const GallerySignUpInputUsername = styled.input`
    margin-bottom: 3%;
    border-radius: 50px;
    border-color: #01bf71;
    text-align: center;
    outline: none;
    border: none;
    white-space: nowrap;
    padding: ${({ big }) => (big ? '14px 48px' : '12px 30px')};
`;

export const GallerySignUpInputEmail = styled.input`
    margin-bottom: 3%;
    border-radius: 50px;
    border-color: #01bf71;
    text-align: center;
    outline: none;
    border: none;
    white-space: nowrap;
    padding: ${({ big }) => (big ? '14px 48px' : '12px 30px')};
`;

export const GallerySignUpInputPassWord = styled.input`
    margin-bottom: 3%;
    border-radius: 50px;
    border-color: #01bf71;
    text-align: center;
    outline: none;
    border: none;
    white-space: nowrap;
    padding: ${({ big }) => (big ? '14px 48px' : '12px 30px')};
`;

export const GallerySignUpTitle = styled.h2`
    font-size: 2rem;
    text-align: center;
    color: #000;
    font-family: 'Arial Black', Gadget, sans-serif;

`;

export const GalleryColumn1Presentation = styled.div``


