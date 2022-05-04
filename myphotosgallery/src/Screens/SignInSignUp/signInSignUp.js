import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import {
    Gallery,
    GalleryTitle,
    GallerySignUp,
    GallerySignIn,
    GallerySignUpInputUsername,
    GallerySignInInputEmail,
    GallerySignInInputPassWord,
    GallerySignUpInputEmail,
    GallerySignUpInputPassWord,
    GallerySignInTitle,
    GallerySignUpTitle,
    GalleryErrorMessage,
    ImgGallery,
    Column1,
    Column2,
    GalleryContainer,
    TextGallery,
    ImgGallery1,
    ImgGallery2,
    ImgGallery3,
    ImgGallery4,
    GalleryBar1,
    GalleryBar2,
    PresentationTitle, 
    PresentationText

} from './signInSignUpElements';
import { ButtonStyled } from "../../Components/ButtonElement"
import img1 from "../../images/livephoto.svg";
import img2 from "../../images/photo_session.svg";
import img3 from "../../images/posting_photo.svg";
import img4 from "../../images/inspiration.svg";
import img5 from "../../images/polaroid.svg";
import img6 from "../../images/selfie.svg";
import img7 from "../../images/screen.svg";
import { Navigate } from "react-router-dom"

const SignInSignUp = (props) => {

    const [userNameSignUp, setUsernameSignUp] = useState("");
    const [emailSignUp, setEmailSignUp] = useState("");
    const [passwordSignUp, setPasswordSignUp] = useState("");
    const [signUpResponse, setSignUpResponse] = useState(false);
    const [messageErrorSignUp, setMessageErrorSignUp] = useState("")

    const [messageErrorSignIn, setMesssageErrorSignIn] = useState("");
    const [emailSignIn, setEmailSignIn] = useState("");
    const [passwordSignIn, setPasswordSignIn] = useState("");
    const [signInResponse, setSignInResponse] = useState(false);

    const dispatch = useDispatch();

    const userNameSignUpSubmit = (arg) => {
        setUsernameSignUp(arg);
    }

    const emailSignUpSubmit = (arg) => {
        setEmailSignUp(arg);
    }
    const passwordSignUpSubmit = (arg) => {
        setPasswordSignUp(arg);
    }


    useEffect(() => {

        localStorage.clear();

    }, [])

    async function submitSignUp() {

        let rawResponse = await fetch("/users/signup", {
            body: `username=${userNameSignUp}&email=${emailSignUp}&password=${passwordSignUp}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "post",
        });

        let response = await rawResponse.json();

        if (response.result) {
            setSignUpResponse(response.result)
            dispatch({ type: 'addToken', token: response.userSaved.token });
            dispatch({ type: 'addUsername', username: response.userSaved.username });
            dispatch({ type: 'addEmail', email: response.userSaved.email })
            localStorage.setItem('username', response.userSaved.username)
            localStorage.setItem('token', response.userSaved.token)
            localStorage.setItem('email', response.userSaved.email)
        } else {
            setEmailSignUp("");
            setUsernameSignUp("");
            setPasswordSignUp("");
            setMessageErrorSignUp(response.error);
        }

        setMesssageErrorSignIn("");

    }

    const emailSignInSubmit = (arg) => {
        setEmailSignIn(arg)
    }

    const passwordSignInSubmit = (arg) => {
        setPasswordSignIn(arg)
    }

    async function submitSignIn() {

        let rawResponse = await fetch("/users/signin", {
            body: `email=${emailSignIn}&password=${passwordSignIn}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "post",
        })

        let response = await rawResponse.json();

        if (response.result) {
            setSignInResponse(response.result);
            dispatch({ type: 'addToken', token: response.user.token });
            dispatch({ type: 'addUsername', username: response.user.username });
            dispatch({ type: 'addEmail', email: response.user.email })
            localStorage.setItem('username', response.user.username)
            localStorage.setItem('token', response.user.token)
            localStorage.setItem('email', response.user.email)
        } else {
            setEmailSignIn("");
            setPasswordSignIn("");
            setMesssageErrorSignIn(response.error);
        }

        setMessageErrorSignUp("");

    }

    // if (signInResponse || signUpResponse) {
    //     return <Navigate to="/gallery" />
    // }

    if (signInResponse || signUpResponse) {
        return (
            <Navigate to={{
                pathname: "/gallery",
                state: signUpResponse
            }}>
            </Navigate>)
    }





    return (
        <>
            <GalleryContainer style={{position: 'relative'}}>
                <Column1>
                    <ImgGallery src={img1} />
                    <TextGallery>Stocker vos photos en toute simplicité</TextGallery>
                    <TextGallery>et sécurité avec...</TextGallery>
                    <ImgGallery src={img2} />
                    <GalleryTitle>myGallery.</GalleryTitle>
                    <ImgGallery src={img3} />
                </Column1>
                <Column2>
                    <Gallery>
                        <GalleryTitle>MyGallery.</GalleryTitle>
                        <GallerySignUp>
                            <GallerySignUpTitle >S'inscrire</GallerySignUpTitle>
                            <GallerySignUpInputUsername value={userNameSignUp} onChange={(arg) => userNameSignUpSubmit(arg.target.value)} placeholder='Pseudo' />
                            <GallerySignUpInputEmail value={emailSignUp.toLowerCase()} type="email" onChange={(arg) => emailSignUpSubmit(arg.target.value)} placeholder='Email' />
                            <GallerySignUpInputPassWord type="password" value={passwordSignUp} onChange={(arg) => passwordSignUpSubmit(arg.target.value)} placeholder='Mot de passe' />
                            <ButtonStyled onClick={() => submitSignUp()}>S'inscrire</ButtonStyled>
                            <GalleryErrorMessage>{messageErrorSignUp}</GalleryErrorMessage>
                        </GallerySignUp>
                        <GallerySignIn>
                            <GallerySignInTitle>Se connecter</GallerySignInTitle>
                            <GallerySignInInputEmail value={emailSignIn.toLowerCase()} onChange={(arg) => emailSignInSubmit(arg.target.value)} placeholder='Email' />
                            <GallerySignInInputPassWord type="password" autoComplete='on' id="passwordsignin" name="passwordsignin" value={passwordSignIn} onChange={(arg) => passwordSignInSubmit(arg.target.value)} placeholder='Mot de passe' />
                            <ButtonStyled onClick={() => submitSignIn()}>Se connecter</ButtonStyled>
                            <GalleryErrorMessage>{messageErrorSignIn}</GalleryErrorMessage>
                            <GalleryErrorMessage style={{ color: "black"}}>Email : visiteur@gmail.com<br/>Mot de passe : visiteur</GalleryErrorMessage>
                        </GallerySignIn>
                    </Gallery>
                </Column2>
            </GalleryContainer>
        </>
    )
};

export default SignInSignUp;
