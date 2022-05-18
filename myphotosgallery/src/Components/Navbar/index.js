import React, { useEffect, useState } from 'react'
import {
    Nav,
    NavContainer,
    NavItems,
    NavLogo,
    NavMenu,
    NavLink,
    NavLogoBis,
    ModalTitle,
    ModalError,
    ModalEmail,
    ModalPseudo,
    ModalInput,
    ModalProfil,
    PicturesInput,
    ModalContainer,
    NavTitle,
    NavMyGallery,
    NavNavigation,
    NavIcon,
    NavIconContainer,
    IconNav,
    HeroNavBarImg
} from "./navbarElements"
import { useDispatch, useSelector } from "react-redux";

import { Menu, Modal, Avatar } from 'antd';
import {
    CloseOutlined,
    EditOutlined,
    UserOutlined,
    LogoutOutlined,
    MailOutlined,
} from '@ant-design/icons';
import { Navigate } from 'react-router-dom';

import Logo from '../../images/favicon.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faPhotoFilm,
    faMagnifyingGlass,
    faMessage
} from '@fortawesome/free-solid-svg-icons';


const Navbar = (props) => {

    const dispatch = useDispatch();
    const [current, setCurrrent] = useState();
    const { SubMenu } = Menu;

    //Redux
    const token = useSelector((state) => state.token);

    //Delete
    const [visibleDelete, setVisibleDelete] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [responseUserDelete, setResponseUserDelete] = useState();

    //Update
    const [visibleUpdate, setVisibleUpdate] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [pseudo, setPseudo] = useState(localStorage.getItem("username"));
    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [errorUpdate, setErrorUpdate] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarChoosen, setAvatarChoosen] = useState("")
    const [responseResult, setResponseUpdate] = useState(false)
    const [visibleNavBar, setVisibleNavBar] = useState("")

    const deleteAll = () => {
        dispatch({ type: 'deleteToken', token: null });
    };

    useEffect(() => {

        avatarChoose();
        setAvatar(avatar)
        setPseudo(pseudo)

    }, [responseResult])

    const handleClick = e => {
        switch (e.key) {
            case 'setting:1':
                setModalUpdate(true);
                setVisibleUpdate(true);
                break;
            case 'setting:2':
                setModalDelete(true);
                setVisibleDelete(true);
                break;
            default:
        };
    };

    const hiddenFileInput = React.useRef(null);

    const handleClickEvent = event => {

        hiddenFileInput.current.click();

    };

    function reload() {
        return <Navigate to="/gallery" />
    }

    async function deleteUser() {
        let rawResponse = await fetch("/users/deleteUser", {
            body: `token=${token}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            method: "post",
        });
        var response = await rawResponse.json();

        if (response) {
            setResponseUserDelete(true);
        }
    }

    async function updateUser() {

        let formData = new FormData();

        if(avatarChoosen === ""){
            console.log("first")
            formData.append("file", null);
        } else {
            console.log("two")
            formData.append("file", avatarChoosen);
        }

        formData.append("user", pseudo);
        formData.append("user", email);
        formData.append("user", token);



        let rawResponse = await fetch("/users/updateUser", {
            method: 'post',
            body: formData,
        })

        let response = await rawResponse.json();

        setResponseUpdate(!responseResult)

        if (response.result) {
            setVisibleUpdate(false);
        } else {
            setErrorUpdate("Remplissez les champs");
        }
    }

    async function avatarChoose() {
        let rawResponse = await fetch(`/users/avatar?token=${localStorage.getItem("token")}`);
        let response = await rawResponse.json();

        if (response) {
            setAvatar(response.response)
        }
    }

    function choosen(arg) {
        setAvatarChoosen(arg.target.files[0]);
    }


    if (responseUserDelete) {
        return <Navigate to="/" />
    }

    let avatarDisplay = "";

    if (avatar === undefined) {
        avatarDisplay = <Avatar onClick={handleClickEvent} style={{ color: "#01bf71" }} size={64} icon={<UserOutlined />} />
    } else {
        avatarDisplay = <Avatar onClick={handleClickEvent} src={`data:${avatar[0].mimetype};base64,${avatar[0].data}`} style={{ color: "#01bf71" }} size={64} icon={<UserOutlined />} />

    }

    if (modalUpdate) {

        var modalUp =
            <Modal
                title="Modifier votre profil"
                centered
                visible={visibleUpdate}
                onOk={updateUser}
                onCancel={() => setVisibleUpdate(false)}
                width={500}
            >
                <ModalContainer>
                    <ModalProfil>
                        <PicturesInput accept="image/png, image/jpeg" type="file" style={{ display: "none" }} ref={hiddenFileInput} onChange={(arg) => choosen(arg)} />
                        {avatarDisplay}
                    </ModalProfil>
                    <ModalPseudo>
                        <ModalTitle><EditOutlined style={{ color: "black", marginRight: "10px" }} />Pseudo</ModalTitle>
                        <ModalInput value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
                    </ModalPseudo>
                    <ModalEmail>
                        <ModalTitle><MailOutlined style={{ color: "black", marginRight: "10px" }} />Email</ModalTitle>
                        <ModalInput value={email} onChange={(e) => setEmail(e.target.value)} />
                    </ModalEmail>
                </ModalContainer>
                <ModalError>{errorUpdate}</ModalError>
            </Modal>
    }

    if (modalDelete) {
        var modalDe =
            <Modal
                title="Voulez-vous supprimer votre compte?"
                centered
                visible={visibleDelete}
                onOk={deleteUser}
                onCancel={() => setVisibleDelete(false)} 
                width={500}
            >
                <p style={{ color: "red" }}>N'ayez crainte vos photos seront supprimées par la même occasion.</p>
            </Modal>
    }

    return (
        <NavContainer>
            <NavMyGallery>
                <NavLogo src={Logo}></NavLogo>
                <NavTitle onClick={() => reload()}>myGallery.</NavTitle>
            </NavMyGallery>
            <NavNavigation>
                <NavIconContainer>
                        <IconNav onClick={() => reload()}><NavLink to="/gallery"><FontAwesomeIcon icon={faPhotoFilm} /></NavLink></IconNav>
                        <IconNav onClick={() => reload()}><NavLink to="/feed"><FontAwesomeIcon icon={faMagnifyingGlass} /></NavLink></IconNav>
                </NavIconContainer>
                <NavMenu style={{ width: `200px` }}>
                    <NavItems>
                        <Menu style={{ borderRadius: "50px", border: "none" }} onClick={(e) => handleClick(e)} selectedKeys={[current]} mode="horizontal">
                            <SubMenu style={{ color: "#01bf71", margin: "auto" }} key="SubMenu" icon={<UserOutlined />} title={pseudo}>
                                <Menu.ItemGroup>
                                    <Menu.Item icon={<EditOutlined style={{ color: "#01bf71" }} />} key="setting:1">Modifier mon profil</Menu.Item>
                                    <Menu.Item icon={<CloseOutlined style={{ color: "red" }} />} key="setting:2">Supprimer mon compte</Menu.Item>
                                    <Menu.Item icon={<LogoutOutlined style={{ color: "#01bf71" }} />} key="setting:3"><NavLink to="/">Se déconnecter</NavLink></Menu.Item>
                                </Menu.ItemGroup>
                            </SubMenu>
                        </Menu>
                    </NavItems>
                </NavMenu>
            </NavNavigation>
            {modalUp}
            {modalDe}
        </NavContainer>

    )
}

export default Navbar;
