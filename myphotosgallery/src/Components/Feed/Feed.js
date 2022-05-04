import React, { useState, useEffect } from 'react'

import {
  Card,
  Image,
  Avatar,
} from 'antd';

import { useSelector } from 'react-redux';

import {
  PicturesUsername,
  PicturesDetails,
  PicturesDesc,
  PictureDate,
  CardLogo,
  FeedContainer,
  FeedMenu,
  UploadContainer,
  FeedTitle,
  FeedInfo,
  ButtonStyledBis,
} from './FeedElements';

import { useMediaQuery } from 'react-responsive';

import { ButtonStyled } from "../ButtonElement";

import { UserOutlined, LoadingOutlined } from '@ant-design/icons';

import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';

import {
  faHeart,
  faComment,
  faAlignJustify,
  faGrip,
  
} from '@fortawesome/free-solid-svg-icons';


const Feed = () => {

  const [allPictures, setAllPictures] = useState([]);
  const [displayGrid, setDisplayGrid] = useState(true);
  const [spinLoader, setSpinLoader] = useState(false);
  const [like, setLike] = useState(false);
  

  const isMobile = useMediaQuery({ query: `(max-width: 888px)` });
  const isNotMobile = useMediaQuery({ query: `(min-width: 889px)` });

  var colorHeart = ""
  if(like){
    colorHeart = "red";
  } else {
    colorHeart = "black";
  }


  var token = useSelector((state) => state.token)

  useEffect(() => {
    displayAllPictures();
  }, [])

  async function displayAllPictures() {
    setSpinLoader(true)
    var rawResponse = await fetch('/allPictures');
    var response = await rawResponse.json();

    if(response.result){
      setSpinLoader(false);
    }

    setAllPictures(response.allPictures)
  }

  var allPicturedOtherUser = allPictures.filter(pics => pics.token !== token)

  console.log(token)
  console.log(allPicturedOtherUser)

  var displayPictures = allPicturedOtherUser.map((pics, i) => {

    //Si l'avatar d'un user n'est pas défini : afficher empty
    let avatarDisplay = "";

    if (pics.avatar[0] === undefined) {
      avatarDisplay = <Avatar style={{ marginBottom: "10px", border: "1px #E5E9ED solid" }} icon={<UserOutlined />} />
    } else {
      avatarDisplay = <Avatar style={{ marginBottom: "10px", border: "1px #E5E9ED solid" }} src={`data:${pics.avatar[0].mimetype};base64,${pics.avatar[0].data}`} icon={<UserOutlined />} />
    }

    let username = pics.username;

    if (displayGrid) {
      return pics.pictures.map(function (pics, i) {
        return (          
          <Card style={{ width: "400px", }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex" }}>
                {avatarDisplay}
                <PicturesUsername style={{ color: "#01bf71", marginTop: "7px", marginLeft: "10px" }}>{username}</PicturesUsername>
              </div>
              <Image style={{ display: "block", width: "350px", height: "350px", objectFit: "cover", margin: "auto", justifyContent: "center" }} src={pics.url} />
            </div>
            <CardLogo style={{ marginLeft: "15px", marginTop: "7px" }}>
              <FontAwesomeIcon onClick={() => setLike(!like)} icon={faHeart} style={{ color: colorHeart, fontSize: "20px", marginRight: "10px",  cursor: "pointer" }} />
              <FontAwesomeIcon icon={faComment} style={{ fontSize: "20px" }} />
            </CardLogo>
            <PicturesDetails>
              <PicturesUsername style={{ color: "#01bf71" }}>{username}</PicturesUsername>
              <PicturesDesc>{pics.desc}</PicturesDesc>
            </PicturesDetails>
            <PictureDate></PictureDate>
          </Card>
        )
      });
    } else if (!displayGrid && isMobile) {
      return pics.pictures.map(function (pics, i) {
        return (

              <Image style={{ display: "block", width: "120px", height: "120px", objectFit: "cover", margin: "auto", justifyContent: "center" }} src={pics.url} />

        )
      })

    } else {
      return pics.pictures.map(function (pics, i) {
        return (
          <Card style={{ width: "700px", }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex" }}>
                {avatarDisplay}
                <PicturesUsername style={{ color: "#01bf71", marginTop: "7px", marginLeft: "10px" }}>{username}</PicturesUsername>            </div>
              <Image style={{ display: "block", width: "600px", height: "600px", objectFit: "cover", margin: "auto", justifyContent: "center" }} src={pics.url} />
            </div>
            <CardLogo style={{ marginLeft: "25px", marginTop: "7px", display: "flex", justifyContent: "space-between" }}>
              <FontAwesomeIcon onClick={() => setLike(!like)} icon={faHeart} style={{ color: colorHeart, fontSize: "20px", marginRight: "10px", cursor: "pointer" }} />
              <FontAwesomeIcon icon={faComment} style={{ fontSize: "20px" }} />
            </CardLogo>
            <PicturesDetails>
              <PicturesUsername style={{ color: "#01bf71", marginLeft: "25px" }}>{username}</PicturesUsername>
              <PicturesDesc>{pics.desc}</PicturesDesc>
            </PicturesDetails>
            <PictureDate></PictureDate>
          </Card>
        )
      });
    }
  })

  let menuGrid = "";
  let iconMenu = "";

  if (displayGrid && isNotMobile) {

    menuGrid = (
      <FeedMenu style={{ margin: "0", paddingBottom: "100px" }}>
        {displayPictures}
      </FeedMenu>
    )

    iconMenu = (
      <FontAwesomeIcon icon={faAlignJustify} />
    )
  } else if (!displayGrid && isNotMobile) {
    menuGrid = (
      <FeedMenu style={{ paddingBottom: "100px" }}>
        {displayPictures}
      </FeedMenu>
    )

    iconMenu = (
      <FontAwesomeIcon icon={faGrip} />
    )
  }

  if (displayGrid && isMobile) {
    menuGrid = (
      <FeedMenu style={{ paddingBottom: "100px" }}>
        {displayPictures}
      </FeedMenu>
    )

    iconMenu = (
      <FontAwesomeIcon icon={faGrip} />
    )
  } else if (!displayGrid && isMobile) {

    menuGrid = (
      <FeedMenu style={{ margin: "0", paddingBottom: "100px" }}>
        {displayPictures}
      </FeedMenu>
    )

    iconMenu = (
      <FontAwesomeIcon icon={faAlignJustify} />
    )
  }

  var displayPics = "";

  if(spinLoader){
    displayPics = menuGrid;
  } else {
    displayPics =  <LoadingOutlined style={{ display: "flex", fontSize: "2rem", margin: "auto", justifyContent: "center"}} />
  }

  var length = 0;


  allPicturedOtherUser.map( (pics, i) => {
    length += pics.pictures.length;
  } )

  console.log(length)

  return (

    <FeedContainer>
      <UploadContainer>
        <FeedTitle>Mon fil d'actualité</FeedTitle>
        <FeedInfo>
          <ButtonStyled>Il y a {length} photos uploadés</ButtonStyled>
          <ButtonStyledBis onClick={() => setDisplayGrid(!displayGrid)}>{iconMenu}</ButtonStyledBis>
        </FeedInfo>
      </UploadContainer>
      <div style={{ width: "100%", border: "1px solid #F6F6F6", marginBottom: "100px" }}></div>
      {displayPics}
    </FeedContainer>
  )
}

export default Feed