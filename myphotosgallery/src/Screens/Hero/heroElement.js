import styled from 'styled-components';

export const HeroContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    padding-left: 8%;
    padding-right: 8%;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    position: relative;

    
`;


export const HeroRow = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;

    @media screen and (max-width: 768px) {
        flex-direction: column;
        height: 200vh;
    }



`;

export const HeroBgImage = styled.img`
    position: fixed;
    left: 30%;

    @media screen and (max-width: 768px) {
        left: -40%;
    }


`;



//Navbar

export const HeroNav = styled.nav`
    flex: 1;
    text-align: right;
    display: inline-block;
    z-index: 100;
    margin-top: 10px;
    width: 100%;
`;

export const HeroLogo = styled.h1`
    width: 50px;
    align-items: center;

    font-weight: bold;
    font-size: 40px;
    font-family: 'Arial Black', sans-serif;

    z-index: 2;

    color: #06bf71;
`;



export const HeroNavBar = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;

    

`;

export const HeroUl = styled.ul`
    flex: 1;
    list-style: none;
    display: inline-block;

    @media screen and (max-width: 678px) {
        display : none;
    }

`;

export const HeroLi = styled.li`
    display: inline-block;
    margin-left: 30px;
    font-weight: bold;
    font-size: 20px;
    font-family: 'Arial Black', sans-serif;
    color: #000;
    

    &:hover {
        color: #E8F9F2;
        cursor: pointer;
    }

    @media screen and (max-width: 768px) {
        color : #06BF71;
    }
`;

export const HeroNavBarImg = styled.img`
    display: none;
    width: 30px;
    color: #000;
    z-index: 3;
    margin-bottom: 12px;

    @media screen and (max-width: 768px) {
        display : block;
    }
`;

export const HeroDivNavBar = styled.div`
    box-sizing: border-box;
    width: 100%;
    background-color: #000;
    z-index : 101;
    display: flex; 
    justify-content: space-around;
    position: fixed;
    left: 0;
    overflow: hidden;
    background-attachment: fixed;

    @media screen and (max-width: 768) {
        display : none;
    }
`;

export const HeroNavBarImg2 = styled.img`
    width: 100px;
    color: white;
`;

export const HeroNavBis = styled.nav`
    height: 100vh;
`;

export const HeroUlBis = styled.ul`
    display: flex;
    height: 50vh;
    width: 100%;
    margin-top: 25vh;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
`;

//Column 1 
export const HeroColumn1 = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    flex-basis: 50%;


    @media screen and (max-width: 768px) {
        transition: all 0.2s ease-in-out;
        height: 100%;
    }

`;

export const HeroSentence = styled.h2`
    font-weight: bold;
    font-size: 20px;
    width: 70%;
    margin-left: 40px;
    margin-top: 20px;
    font-family: 'Arial Black', sans-serif;
    text-align: center;

    z-index: 3;

    color: #000;

    @media screen and (max-width: 768px) {
        width: 50%;
        margin: auto;
        text-align: center;
        color: #000;

    }
`;

export const HeroPhotoCompil = styled.img`
    width: 90%;

    &:hover {
        transform: scale(1.02);
        transition: all 0.2s ease-in-out;
        cursor: pointer;
    }

    

`;

//Column 2 
export const HeroColumn2 = styled.div`  
    position: relative;
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-basis: 50%;

    @media screen and (max-width: 768px) {
        height: 100%;
    }
`;

export const HeroImage1 = styled.img`
    width: 60%;
    z-index: 50;
    margin-left: 30%;

    @media screen and (max-width: 768px) {
        width: 55%;
        margin: auto;
    }

    &:hover {
        transform: scale(1.02);
        transition: all 0.2s ease-in-out;
        cursor: pointer;
    }

`;

export const HeroImage2 = styled.img`   
    width: 30%; 
    margin-left: 70%;
    z-index: 0;

    @media screen and (max-width: 768px) {
        width: 40%;
        margin: auto;
    }

    &:hover {
        transform: scale(1.02);
        transition: all 0.2s ease-in-out;
        cursor: pointer;
    }
`;

export const HeroSentence2 = styled.p`
    font-weight: bold;
    font-size: 20px;
    font-family: 'Arial Black', sans-serif;
    text-align: center;
    margin-left: 350px;
    margin-top: 20px;
    margin-bottom: 20px;


    color: #fff;

    @media screen and (max-width: 768px) {
        width: 90%;
        margin: auto;

        color: #000;

    }

    @media screen and (max-width: 1311px) {
        color: #000;

    }
`;




