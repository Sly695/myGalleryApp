import React, { useState } from 'react'
import {
  HeroContainer,
  HeroColumn1,
  HeroColumn2,
  HeroNavBar,
  HeroNavBis,
  HeroUl,
  HeroUlBis,
  HeroLi,
  HeroLogo,
  HeroNav,
  HeroRow,
  HeroPhotoCompil,
  HeroSentence,
  HeroSentence2,
  HeroImage1,
  HeroImage2,
  HeroBgImage,
  HeroNavBarImg,
  HeroDivNavBar,
  HeroNavBarImg2
} from './heroElement'


import PhotosCompil from '../../images/PhotosCompil.svg';
import Vector from '../../images/Vector.svg';
import Polaroid from '../../images/polaroid.svg';
import inspiration from '../../images/inspiration.svg';
import NavbarIcon from '../../images/bars-solid.svg'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons'

const Hero = () => {

  const [visibleNavBar, setVisibleNavBar] = useState("none")

  return (
    <HeroContainer>
      <HeroDivNavBar style={{display: visibleNavBar}} >
        <FontAwesomeIcon style={{ position: "absolute", top: "20", right: "30", fontSize: "50px", color: "#06BF71"}} onClick={() => setVisibleNavBar("none")} icon={faXmark}/>
        <HeroNavBis>
          <HeroUlBis>
            <HeroLi>myG.</HeroLi>
            <HeroLi>Avantages</HeroLi>
            <HeroLi>S'incrire</HeroLi>
            <HeroLi>A propos</HeroLi>
          </HeroUlBis>
        </HeroNavBis>
      </HeroDivNavBar>
      <HeroNavBar>
        <HeroLogo>myGallery.</HeroLogo>
        <HeroNav>
          <HeroUl>
            <HeroLi>myG.</HeroLi>
            <HeroLi>avantages</HeroLi>
            <HeroLi>s'incrire</HeroLi>
            <HeroLi>a propos</HeroLi>
          </HeroUl>
        </HeroNav>
        <HeroNavBarImg onClick={() => setVisibleNavBar("block")} src={NavbarIcon} />
      </HeroNavBar>
      <HeroBgImage src={Vector} />
      <HeroRow>
        <HeroColumn1>
          <HeroSentence>LIEU QUI EST UTILISÉ POUR LES ARTISTES POUR EXPOSER LEUR OEUVRES</HeroSentence>
          <HeroPhotoCompil src={PhotosCompil} />
        </HeroColumn1>
        <HeroColumn2>
          <HeroImage1 src={inspiration} />
          <HeroSentence2>COMPTEMPLER VOS OEUVRES SANS SE SOUCIER</HeroSentence2>
          <HeroImage2 src={Polaroid} />
        </HeroColumn2>
      </HeroRow>
    </HeroContainer>


  )
}

export default Hero;