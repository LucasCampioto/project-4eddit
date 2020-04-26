import React, { Component } from 'react';
import { login } from '../../actions/login';
import { connect } from "react-redux";
import { push } from 'connected-react-router';
import { routes } from '../Router';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import Logo from '../../4eddit.png';
import Fire from '../../fire.png'


const HeaderContainer = styled.div`
  text-align: center;
  color: white;
  text-shadow: 1px 1px black;
  font-size: 12pt;  
`

const StyledImg = styled.img`
   width: 15vw;
   height: auto;
   @media only screen and (max-width: 682px){
    width: 30vw;
    
  }
`

const StyledImgFire = styled.img`
  position: absolute;
  width:15vw;
  height:30vh;
  margin-left:360px;
  margin-top:20px;
  z-index:-1;
   transform: rotate(-20deg);
`

const StyledInputContainer = styled.div`
  width:30vw;
  height: 65vh;
  margin:auto;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  padding: 100px;
  align-items: center;
  background-color:#fff;
  box-shadow: 6px 6px 10px rgba(0,0,0,0.4);
  border-radius:15px;
  @media only screen and (max-width: 682px){
    width: 90vw;
    height: 58vh;
  }
`

const StyledTextLogin = styled.h1`
  font-size:30px;
  color: black;
  margin-top:-60px;
`

const StyledTextField = styled(TextField)`
  margin-bottom:30px;
  width:20vw;
  @media only screen and (max-width: 682px){
    width: 70vw;
  }
`
const ContainerButtons = styled.div`
  display:flex;
`

const StyledButton = styled(Button)`
  width: 10vw;
  margin:0px 15px;
  padding: 10px;
  font-weight: bold;
  background-color:#ff4917;
  @media only screen and (max-width: 682px){
    font-size: 9px;
  }
`


class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    }
  }

  handleFieldChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleLoginButton = () => {
    this.props.login(this.state.email, this.state.password)
  }

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <HeaderContainer>
          <StyledImg src={Logo} alt="imagem da logo" />
        </HeaderContainer>
          <StyledImgFire src={Fire} alt="imagem fogo" />

        <StyledInputContainer>
          <StyledTextLogin>Login</StyledTextLogin>
          <StyledTextField
            onChange={this.handleFieldChange}
            name="email"
            type="email"
            label="E-mail"
            value={email}
            variant="outlined"
            color="secondary"
          />

          <StyledTextField
            onChange={this.handleFieldChange}
            name="password"
            type="password"
            label="Password"
            value={password}
            variant="outlined"
            color="secondary"
          />

          <ContainerButtons>
            <StyledButton onClick={this.handleLoginButton} color="secondary" variant="contained">Entrar</StyledButton>
            <StyledButton onClick={this.props.goToRegister} color="secondary" variant="contained">Cadastrar</StyledButton>
          </ContainerButtons>

        </StyledInputContainer>

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(login(email, password)),
  goToRegister: () => dispatch(push(routes.signup))
})

export default connect(null, mapDispatchToProps)(LoginPage);
