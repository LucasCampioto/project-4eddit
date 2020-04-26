import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import { connect } from "react-redux";
import { routes } from '../Router/';
import { push } from 'connected-react-router';
import Button from '@material-ui/core/Button';
import Logo from '../../4eddit.png';
import styled from 'styled-components';
import { createUser } from "../../actions/signUp";

const MainContainer = styled.div`
  text-align: center;
`

const StyledInputContainer = styled.div`
  background: white;
  padding: 100px 0;
  background-color:#ed7f61;
`

const StyledImg = styled.img`
  max-width: 15vw;
  height: auto;
`

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledTextField = styled(TextField)`
  margin: 10px;
  width: 300px;
`

const StyledDiv = styled.div`
  padding: 5px 0;
  background: #ffb08f;
  color: transparent;
`

const StyleText = styled.h2`
    font-size: 18pt;
`

const StyledButtonSignUp = styled(Button)`
  margin-top: 10px;
  font-weight: bold;
`

const StyledButtonGoBack = styled(Button)`
  font-weight: bold;
  margin-top: 20px;
`

const signUpForm = [
  {
    name: "username",
    type: "text",
    label: "Nome de Usuário",
    required: true,
    variant: "outlined",
    color: "secondary"
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    required: true,
    variant: "outlined",
    color: "secondary"
  },
  {
    name: "password",
    type: "password",
    label: "Senha",
    required: true,
    variant: "outlined",
    color: "secondary"
  }
]

class SignUpPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {},
    }
  }

  handleInputChanges = event => {
    const { name, value } = event.target;
    this.setState({ form: { ...this.state.form, [name]: value } });
  }

  handleCreateUser = () => {
    const { email, password, username } = this.state.form
    this.props.createUser(email, password, username)
  }

  render() {
    return (
      <MainContainer>
        <StyledImg src={Logo} alt="imagem da logo" />   
        <StyledInputContainer>
          <StyleText>Cadastro para Novos Usuários</StyleText>
          <FormContainer onSubmit={this.handleCreateUser}>
            {signUpForm.map((input, index) => (
              <StyledTextField
                key={index}
                name={input.name}
                value={this.state.form[input.name] || ""}
                id={input.name}
                label={input.label}
                onChange={this.handleInputChanges}
                variant={input.variant}
                type={input.type}
                color={input.color}
              />
            ))}
             <StyledButtonSignUp 
              onClick={this.props.goToLoginPage} 
              variant="contained" 
              color="secondary">
              Cadastrar
            </StyledButtonSignUp>          
          </FormContainer>
        </StyledInputContainer>
      </MainContainer>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createUser: (email, password, username) => dispatch(createUser(email, password, username)),
    goToLoginPage: () => dispatch(push(routes.root))
  }
}

export default connect(null, mapDispatchToProps)(SignUpPage);