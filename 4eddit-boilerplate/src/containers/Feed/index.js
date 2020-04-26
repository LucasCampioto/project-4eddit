import React, { Component } from "react";
import styled from "styled-components";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Posts from '../../components/Posts'
import { push } from "connected-react-router";
import { routes } from "../Router";
import { connect } from "react-redux";
import { getPosts, createPost } from "../../actions/posts";
import Header from '../../components/Header/index'


const Container = styled.div`
    margin:auto;
    text-align:center;
    background-color:#ed7f61;
    
`
const StyleTextField = styled(TextField)`
    margin-bottom:10px;
`
const ContainerNewPost = styled.div`
    margin:auto;
    width: 30vw;
    height:44vh;
    background-color:#fff;
    box-shadow: 6px 6px 10px rgba(0,0,0,0.4);
    border-radius:15px;
    @media only screen and (max-width: 682px){
    width:80vw; 
  }
`

const StyledFeed = styled.h1`
    font-size:40px;
    color: black;
`

const ContainerButton = styled.div`
    margin-top:15px;
    padding-bottom:20px;
`

const StyledInputContainer = styled.div`
    background: white;
    padding: 70px 0;
    background-color:#ed7f61;
`

const StyleText = styled.h2`
    font-size: 18pt;
    padding-top:20px;
`


const StyledButton = styled(Button)`
   background-color:#ff4917;
   font-weight: bold;
  
`


const formFeed = [
    {
        name: "title",
        type: "text",
        label: "Título",
        required: true,
        color: "secondary"
    },
    {
        name: "text",
        type: "text",
        label: "Escreva seu post",
        required: true,
        color: "secondary"
    }
]

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {},
        };
    }

    componentDidMount(){
        if (localStorage.getItem("token") === null){
            this.props.goToLoginPage()
            window.alert("Área restrita. Faça seu login")
           }
        this.props.getPosts()
    }

    handleFieldChange = event => {
        const { name, value } = event.target;
        this.setState({ form: { ...this.state.form, [name]: value } });
    };

    sendNewPost = (event) => {
        event.preventDefault()
        const { title, text } = this.state.form
        this.props.createPost(title, text)
    }

    render() {
        return (
            <Container>
                <Header />
                <StyledInputContainer> 
                    <ContainerNewPost>                                    
                        <StyleText>Novo Post</StyleText>                    
                            <form onSubmit={this.sendPostData}>
                                {formFeed.map(input=> (
                                    <div key={input.name}>
                                        <StyleTextField
                                            onChange={this.handleFieldChange}
                                            name={input.name}
                                            type={input.type}
                                            label={input.label}
                                            value={this.state.form[input.name] || ""}
                                            color={input.color}
                                            variant="outlined"
                                        />
                                    </div>
                                ))}
                                <ContainerButton>
                                    <StyledButton 
                                        onClick={this.sendNewPost} 
                                        color="secondary"
                                        variant="contained">
                                        Postar
                                    </StyledButton>  
                                </ContainerButton>
                            </form>
                    </ContainerNewPost> 
                </StyledInputContainer>
                    <StyledFeed>Feed</StyledFeed>
                    {this.props.getToPosts.map((post, index) => (
                        <Posts key={index} post={post} onClick={this.props.onClick}></Posts>
                    ))}                
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    getToPosts: state.posts.allPosts,
})

const mapDispatchToProps = (dispatch) => {
    return {
        createPost: (title, text) => dispatch(createPost(title, text)),
        getPosts: () => dispatch(getPosts()),
        goToPostDetails: () =>  dispatch(push(routes.post)),
        goToLoginPage: () => dispatch(push(routes.root)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed);