import styled from 'styled-components';
import { Link as LinkR } from 'react-router-dom'


export const NavContainer = styled.div`
    display: flex;
    justify-content: space-around;  
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: #000;

`

export const NavItems = styled.li`
    margin: 20px;
    font-size: 20px;
    color: #000;
    font-weight: bold;
    text-align: center;
    list-style-type: none;
    
`;

export const NavTitle = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: #01bf71;
    font-family: 'Arial Black', Gadget, sans-serif;
    margin: auto;

    @media screen and (max-width: 768px) {
        display: none;
    }

`;

export const NavLogoBis = styled.p`
    font-size: 20px;
    font-weight: bold;
    color: #01bf71;
    margin: auto;
    font-family: 'Arial Black', Gadget, sans-serif;



    @media screen and (min-width: 769px) {
        display: none;
    }
`;

export const NavMenu = styled.div`
    
`;

export const NavLink = styled(LinkR)`
    text-decoration: none;
    cursor: pointer;
    outline: none;
    border: none;
    color: white;

    &:hover {
       color: #01bf71;
    }

    
`;

export const SpanNav = styled.span`
    color: #fff;
`;

export const ModalTitle = styled.p`
    color : #01bf71;
    margin-top: 12px;
    margin: auto;    
`;

export const ModalError = styled.p`
    color : red;
    
`;
 
export const ModalPseudo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 20px;
    margin-top: 20px;
`;

export const ModalEmail = styled.div`
    display: flex;
    flex-direction: column;
    
`;

export const ModalInput = styled.input`
    width: 80%;
    display: flex;
    margin: auto;
    margin-bottom: 3%;
    border-radius: 50px;
    border-color: 01bf71;
    text-align: center;
    outline: none;
    white-space: nowrap;
    padding: ${({ big }) => (big ? '14px 48px' : '12px 30px')};
`;

export const ModalProfil = styled.div`
    display: flex;
    flex-direction: column;
    margin: auto;
    cursor: pointer;
`;

export const PicturesInput = styled.input``;

export const ModalContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

export const NavLogo = styled.img`
    width: 60px;
    height: 50px;
    margin: auto;
`;

export const NavMyGallery = styled.div`
    display: flex;
    justify-content: space-between;
    width: 30%;
`;


export const NavNavigation = styled.div`
    display: flex;
    justify-content: space-between;
    width: 400px;
`;

export const NavIcon = styled.div`
    display: flex;
    justify-content: space-between;
    width: 30%;
    margin: auto;
`

export const NavIconContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 50%;
    
`;

export const IconNav = styled.div`
    font-size: 20px;
    margin: auto;
`;