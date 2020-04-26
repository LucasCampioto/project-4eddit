import React from 'react';
import styled from 'styled-components';
import Logo from '../../4eddit.png'

const ContainerHeader = styled.div`
width:100%;
height: 15vh;
background-color:#ed7f61;
border-bottom:solid 2px #ff997d;
text-align:center;
`
const StyledImg = styled.img`
   width: 15vw;
   margin-bottom:50px;
   @media only screen and (max-width: 682px){
    height:8vh;
    width: 30vw;
    margin-top:13px;
  }
  
`

function Header(props){
    return(
        <ContainerHeader>
            <StyledImg src={Logo} alt="imagem da logo"></StyledImg>
        </ContainerHeader>
    )
}

export default Header;