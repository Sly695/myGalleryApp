import React, { useEffect, useState } from 'react';
import {
    PicturesContainer,
    PicturesMenu,
    PicturesTitle,
    PicturesWrap,
    PicturesForm,
    PicturesInput,
    PicturesInfo,
    MenuP,
    CardLogo,
    PicturesDesc,
    PicturesUsername,
    PicturesDetails,
    ButtonStyledBis,
    UploadContainer,
    PictureDate,
    PictureBr
} from './galleryElements';
import { ButtonStyled } from "../ButtonElement"
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import {
    faHeart,
    faComment,
    faEllipsis,
    faUpload,
    faGrip,
    faAlignJustify,
} from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from 'react-router-dom';
import { LoadingOutlined, UserOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons';

import { useMediaQuery } from 'react-responsive';

//AntDesign
import 'antd/dist/antd.css';
import {
    Avatar,
    Menu,
    Dropdown,
    Image,
    Card,
    Modal,
    Input
} from 'antd';

const GalleryS = (props) => {

    const [file, setFile] = useState();
    const [photoAdded, setPhotoAdded] = useState();
    const [allPictures, setAllPictures] = useState([]);
    const [idPictures, setIdPictures] = useState("");
    const [picturesDesc, setPicturesDesc] = useState("");
    const [photoUpdate, setPhotoUpdate] = useState();
    const [deletePictures, setDeletePictures] = useState(false);
    const [spinLoader, setSpinLoader] = useState(false);
    const [displayLoading, setDisplayLoading] = useState()
    const [avatar, setAvatar] = useState();
    const [displayGrid, setDisplayGrid] = useState(true);
    const [disabledUpload, setDisabledUpload] = useState(false);
    const [like, setLike] = useState(false);
    const [photoLikedByUser, setPhotoLikedByUser] = useState([])
    const [likedPictures, setLikedPictures] = useState([]);
    const { Meta } = Card;

    //Const Modal

    const [isModalVisible, setIsModalVisible] = useState(false);

    //Redux

    const token = useSelector((state) => state.token);
    const username = localStorage.getItem("username");



    //react-responsive

    const isMobile = useMediaQuery({ query: `(max-width: 888px)` });
    const isNotMobile = useMediaQuery({ query: `(min-width: 889px)` });


    useEffect(() => {
        displayPhotos();
        displayAvatar();

        return () => setFile()

    }, [photoAdded, deletePictures, photoUpdate, spinLoader, username, like]);

    //CHOIX DE LA PHOTO

    async function choosen(arg) {
        setFile(arg.target.files[0]);
    }

    //DISPLAY PHOTO

    async function displayPhotos() {
        let rawResponse = await fetch(`/allUserPictures?token=${localStorage.getItem("token")}`);
        let response = await rawResponse.json();
        if (response.result) {
            setAllPictures(response.allPictures[0].pictures);
            setPhotoLikedByUser(response.allPictures[0].picturesLiked)
            setDisplayLoading(true);
        }

    };

    // PHOTO DE PROFIL 

    async function displayAvatar() {
        let rawResponse = await fetch(`/users/avatar?token=${localStorage.getItem("token")}`);
        let response = await rawResponse.json();

        if (response.result) {
            setAvatar(response.response)
        }
    }

    //ADD

    async function clicked(state) {

        setSpinLoader(true);
        setDisabledUpload(true)

        if (file === undefined) {
            setSpinLoader(false);
            setDisabledUpload(false);
        } else {
            let formData = new FormData();

            formData.append("file", file);
            formData.append("user", token);
            formData.append("user", username);


            let rawResponse = await fetch("/addPicture", {
                method: 'post',
                body: formData,
            })

            let response = await rawResponse.json();

            if (response.result) {
                setPhotoAdded(response.data)
                setSpinLoader(false);
                setDisabledUpload(false);
            }
        }

    };

    //DELETE

    async function deletePicture(id, index) {

        console.log(index)

        let rawResponse = await fetch(`/deletePicture?id=${id}&token=${token}&index=${index}`, {
            method: 'DELETE',
        })

        let response = await rawResponse.json();

        setDeletePictures(response)

    };

    // Pour cacher la partie "nom" de l'input choix du fichier

    const hiddenFileInput = React.useRef(null);

    const handleClick = event => {

        hiddenFileInput.current.click();

    };

    // photo de profil existante afficher sinon non
    let avatarDisplay = "";


    if (avatar === undefined) {
        avatarDisplay = <Avatar style={{ marginBottom: "10px", border: "1px #E5E9ED solid" }} icon={<UserOutlined />} />
    } else {
        avatarDisplay = <Avatar style={{ marginBottom: "10px", border: "1px #E5E9ED solid" }} src={`data:${avatar[0].mimetype};base64,${avatar[0].data}`} icon={<UserOutlined />} />
    }

    //ModalDesc

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {

        async function submit() {
            let rawResponse = await fetch("/addDescription", {
                body: `desc=${picturesDesc}&id=${idPictures}&token=${token}`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                method: "post",
            });

            let response = await rawResponse.json();

            setPhotoUpdate(response.result);
        }

        submit();
        setIsModalVisible(false);

    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    async function handleLiked(idPicture) {
        var rawResponse = await fetch(`/likePicture?token=${token}&idPicture=${idPicture}`);
        setLike(!like)
    }


    let pictures = allPictures.map(function (pics, i) {

        let heart = "";
        var photoMatched = photoLikedByUser.find(id => id === pics._id.toString())
        if(photoMatched){
            heart = <FontAwesomeIcon onClick={() => handleLiked(pics._id)} icon={faHeart} style={{ color: "red", fontSize: "20px", marginRight: "10px", cursor: "pointer" }} />

        } else {
            heart = <FontAwesomeIcon onClick={() => handleLiked(pics._id)} icon={faHeart} style={{ color: "black", fontSize: "20px", marginRight: "10px", cursor: "pointer" }} />
        }

        const menu = props => (
            <Menu pics="wow" >
                <Menu.Item>
                    <MenuP onClick={() => { setIsModalVisible(true); setIdPictures(allPictures.indexOf(pics)) }} target="_blank" rel="column">
                        <EditOutlined style={{ color: "#01bf71", marginRight: "10px" }} />Modifier la description
                    </MenuP>
                </Menu.Item>
                <Menu.Item>
                    <MenuP onClick={() => deletePicture(pics._id, allPictures.indexOf(pics))} target="_blank" rel="grid">
                        <CloseOutlined style={{ color: "red", marginRight: "10px" }} />Supprimer la photo
                    </MenuP>
                </Menu.Item>
            </Menu>

        );

        let sizeImage = "";


        if (displayGrid) {


            sizeImage = (
                <div>
                    <Card style={{ width: "400px", }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ display: "flex" }}>
                                {avatarDisplay}
                                <PicturesUsername style={{ color: "#01bf71", marginTop: "7px", marginLeft: "10px" }}>{username}</PicturesUsername>
                            </div>
                            <Image style={{ display: "block", width: "350px", height: "350px", objectFit: "cover", margin: "auto", justifyContent: "center" }} src={pics.url} />
                        </div>
                        {/* <FontAwesomeIcon style={{ fontSize: "20px", color: "#01bf71", cursor: "pointer", position: "absolute", top: "18", right: "18" }} onClick={() => deletePicture(pics._id)} icon={faCircleXmark} /> */}
                        <Dropdown overlay={menu} placement="topRight" arrow>
                            <FontAwesomeIcon style={{ fontSize: "20px", color: "#01bf71", cursor: "pointer", position: "absolute", top: "425", right: "25" }} icon={faEllipsis} />
                        </Dropdown>
                        <CardLogo style={{ marginLeft: "15px", marginTop: "7px" }}>
                            {heart}
                            <FontAwesomeIcon icon={faComment} style={{ fontSize: "20px", color: "grey" }} />
                        </CardLogo>
                        {pics.like} likes
                        <PicturesDetails>
                            <PicturesUsername style={{ color: "#01bf71" }}>{username}</PicturesUsername>
                            <PicturesDesc>{pics.desc}</PicturesDesc>
                        </PicturesDetails>
                        <PictureDate>{JSON.stringify(pics.date.split("T")[0].split("GM")[0])}</PictureDate>
                    </Card>
                </div>
            )
        } else if (!displayGrid && isMobile) {

            sizeImage = (
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                    <Image style={{ display: "block", width: "120px", height: "120px", objectFit: "cover", margin: "auto", justifyContent: "center" }} src={pics.url} />
                </div>
            )

        } else {

            sizeImage = (
                <div>
                    <Card style={{ width: "700px", marginBottom: "-25" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <div style={{ display: "flex", marginLeft: "25px" }}>
                                {avatarDisplay}
                                <PicturesUsername style={{ color: "#01bf71", marginTop: "7px", marginLeft: "10px" }}>{username}</PicturesUsername>
                            </div>
                            <Image style={{ display: "block", width: "600px", height: "600px", objectFit: "cover", margin: "auto", justifyContent: "center" }} src={pics.url} />
                        </div>
                        <Dropdown overlay={menu} placement="topRight" arrow>
                            <FontAwesomeIcon style={{ fontSize: "20px", color: "#01bf71", cursor: "pointer", position: "absolute", top: "675", right: "50" }} icon={faEllipsis} />
                        </Dropdown>
                        <CardLogo style={{ marginLeft: "40px", marginTop: "7px" }}>
                            <FontAwesomeIcon icon={faHeart} style={{ fontSize: "20px", marginRight: "10px" }} />
                            <FontAwesomeIcon icon={faComment} style={{ fontSize: "20px" }} />
                        </CardLogo>
                        {pics.like}
                        <PicturesDetails>
                            <PicturesUsername style={{ color: "#01bf71", marginLeft: "25px" }}>{username}</PicturesUsername>
                            <PicturesDesc>{pics.desc}</PicturesDesc>
                        </PicturesDetails>
                        <PictureDate>{JSON.stringify(pics.date.split("T")[0].split("GM")[0])}</PictureDate>
                    </Card>
                </div>
            )
        }


        return (
            <div >
                {sizeImage}
            </div>

        );
    });



    //Photo ou Photos

    let photos = "";

    if (allPictures.length > 1) {
        photos = "photos";
    } else {
        photos = "photo";
    };

    //Icon Loading durant requête /addPhoto

    let iconLoader = null;

    if (spinLoader) {
        iconLoader = <LoadingOutlined />
    } else {
        iconLoader = <FontAwesomeIcon icon={faUpload} />
    };

    //Icon Loading durant requête /allPictures

    let photosDisplay = [];

    if (displayLoading) {
        photosDisplay = pictures;
    } else {
        photosDisplay = <LoadingOutlined style={{ fontSize: "2rem" }} />
    }

    //Si il n y a pas de token redirigier SignInSignUp

    if (localStorage.getItem('token') === null) {
        return <Navigate to="/" />
    }

    let menuGrid = "";
    let iconMenu = "";

    if (displayGrid && isNotMobile) {

        menuGrid = (
            <PicturesMenu style={{ margin: "0", paddingBottom: "100px" }}>
                {photosDisplay}
            </PicturesMenu>
        )

        iconMenu = (
            <FontAwesomeIcon icon={faAlignJustify} />
        )
    } else if (!displayGrid && isNotMobile) {
        menuGrid = (
            <PicturesMenu style={{ paddingBottom: "100px" }}>
                {photosDisplay}
            </PicturesMenu>
        )

        iconMenu = (
            <FontAwesomeIcon icon={faGrip} />
        )
    }

    if (displayGrid && isMobile) {
        menuGrid = (
            <PicturesMenu style={{ paddingBottom: "100px" }}>
                {photosDisplay}
            </PicturesMenu>
        )

        iconMenu = (
            <FontAwesomeIcon icon={faGrip} />
        )
    } else if (!displayGrid && isMobile) {

        menuGrid = (
            <PicturesMenu style={{ margin: "0", paddingBottom: "100px" }}>
                {photosDisplay}
            </PicturesMenu>
        )

        iconMenu = (
            <FontAwesomeIcon icon={faAlignJustify} />
        )
    }

    return (
        <PicturesContainer>
            <UploadContainer>
                <PicturesTitle>Mes photos</PicturesTitle>
                <PicturesWrap>
                    <PicturesForm>
                        <PicturesInput accept="image/png, image/jpeg" type="file" style={{ display: "none" }} ref={hiddenFileInput} onChange={(arg) => choosen(arg)} />
                        <ButtonStyled disabled={disabledUpload} onClick={handleClick}>Choisir un fichier</ButtonStyled>
                        <ButtonStyled disabled={disabledUpload} onClick={clicked} value="ok">{iconLoader}</ButtonStyled>
                    </PicturesForm>
                </PicturesWrap>
                <PicturesInfo>
                    <ButtonStyled>Vous avez uploadé {allPictures.length} {photos}</ButtonStyled>
                    <ButtonStyledBis onClick={() => setDisplayGrid(!displayGrid)}>{iconMenu}</ButtonStyledBis>
                </PicturesInfo>
            </UploadContainer>
            <div style={{ width: "100%", border: "1px solid #F6F6F6", marginBottom: "100px" }}></div>
            {menuGrid}
            <Modal title="Modifier la description" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Input onChange={(arg, i) => setPicturesDesc(arg.target.value)} />
            </Modal>
        </PicturesContainer>

    )
}

export default GalleryS;
