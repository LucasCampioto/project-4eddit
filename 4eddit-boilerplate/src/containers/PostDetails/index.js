import React, { Component } from "react";
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { routes } from '../Router';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import { getPostDetail, postVote, createComment, voteComment } from '../../actions/posts';
import Header from '../../components/Header/index'

const StyledMainContainer = styled.div`
   width:30%;
   margin:20px auto;
   text-align:center;
`

const StyledTitle = styled.h1`
   color: black;
   @media only screen and (max-width: 682px){
   font-size:25px;
    
  }
`

const StyledCardsContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
`

const StyledCardDetails = styled(Card)`
    background-color:#fff;
    @media only screen and (max-width: 682px){
      width:80vw; 
      margin:20px 20px;   
   }
`

const AddCommentContainer = styled.div`
   width: 330px;
   margin: 15px;
   padding: 20px;
   @media only screen and (max-width: 682px){
    width:60vw; 
    margin:20px 20px;
    
  }
`

const StyledInputComment = styled(TextField)`
   :focus {
      color: black;
   }
   @media only screen and (max-width: 682px){
    width:57vw; 
    margin-left:-10px;
  }
  
`

const CommentDetailsPost = styled.span`
    @media only screen and (max-width: 682px){ 
    margin-left:-120px;
  }
`

const CommentsContainer = styled.div`
   margin: 15px 300px;
   text-align: center;
   box-shadow: 3px 3px 0px rgba(0,0,0,0.3);
   padding: 20px;
   width: 450px;  
   background: white;
   border-radius: 5px;
   @media only screen and (max-width: 682px){ 
    width:80vw;
  }
`

const ContainerPostsCount = styled.div`
   margin-left:10px;
   margin-right:240px;
`

const ArrowUp = styled.span`
   cursor:pointer;
   font-size:17px;
   margin-right:2px;
   color:green;
`

const ArrowDown = styled.span`
   cursor:pointer;
   font-size:17px;
   margin-left:2px;
   color:red;
`

const NumberOfComments = styled.span`
   margin-left:5px;
`

const ContainerButtonBack = styled.div`
   margin: 50px 0px;
`

const StyledButton = styled(Button)`
   background-color:#ff4917;
   font-weight: bold;
`

const StyledCard = styled(Card)`
   margin-top: 15px;
`

const StyledBackButton = styled(Fab)`
   position: fixed;
   bottom: 300px;
   right: 20px;
   background-color:#ff4917;
   font-weight: bold;
   @media only screen and (max-width: 682px){
      display:none;
  }
`

const addComment = [
   {
      name: "text",
      type: "text",
      label: "Escreva seu comentário",
      required: true,
      variant: "outlined",
      color: "secondary",
   },
]

class PostDetails extends Component {
   constructor(props) {
      super(props)
      this.state = {
         comments: "",
      }
   }

   componentDidMount() {
      const token = window.localStorage.getItem("token")
      if (token === null) {
         this.props.goToLoginPage()
         window.alert("Área restrita. Faça seu login")
      }

      this.props.getPostDetail(this.props.postIdSelected)
   }

   handleInputChanges = event => {
      const { name, value } = event.target;
      this.setState({ comments: { ...this.state.comments, [name]: value } });
   };

   handleCreateComment = (event) => {
      event.preventDefault()
      const { text } = this.state.comments;
      const { postIdSelected } = this.props
      this.props.createComment(text, postIdSelected)
      this.setState({ comments: "" })
   }

   render() {
      return (
         <div>
            <Header />
            <StyledMainContainer>
               <StyledTitle>Detalhes do Post</StyledTitle>

               <ContainerButtonBack>
                  <StyledBackButton
                     onClick={this.props.gotToFeedPage}
                     color="secondary"
                     variant="contained">
                     Voltar
                  </StyledBackButton>
               </ContainerButtonBack>

               <StyledCardsContainer>
                  <StyledCardDetails>
                     <CardContent>
                        <Typography variant="h5" gutterBottom>
                           <span>{this.props.postDetails.username}</span>
                        </Typography>
                        <hr />
                        <Typography>
                           <span>{this.props.postDetails.text}</span>
                        </Typography>
                     </CardContent>

                     <CardActions>
                        <ContainerPostsCount>
                           <ArrowUp onClick={() => { this.props.postVote(+1, this.props.postDetails.id) }}>⬆</ArrowUp>
                           <span>{this.props.postDetails.userVoteDirection}</span>
                           <ArrowDown onClick={() => { this.props.postVote(-1, this.props.postDetails.id) }}>⬇</ArrowDown>
                        </ContainerPostsCount>
                        <div>
                           <CommentDetailsPost>comentários</CommentDetailsPost>
                           <NumberOfComments>{this.props.postDetails.commentsNumber}</NumberOfComments>
                        </div>
                     </CardActions>
                  </StyledCardDetails>

                  <StyledCard>
                     <CardContent>
                        <AddCommentContainer>
                           <form>
                              {addComment.map((input, index) => (
                                 <StyledInputComment
                                    key={index}
                                    name={input.name}
                                    value={this.state.comments[input.name] || ""}
                                    id={input.name}
                                    label={input.label}
                                    variant={input.variant}
                                    type={input.type}
                                    onChange={this.handleInputChanges}
                                    multiline
                                    color={input.color}
                                 />
                              ))}
                           </form>
                        </AddCommentContainer>
                        <StyledButton
                           onClick={this.handleCreateComment}
                           color="secondary"
                           variant="contained">
                           Comentar
                        </StyledButton>
                     </CardContent>
                  </StyledCard>

                  <StyledTitle>Comentários</StyledTitle>
                  {this.props.postDetails.comments && this.props.postDetails.comments.map((comment, index) => (
                     <CommentsContainer key={index}>
                        <h3>{comment.username}</h3>
                        <p>{comment.text}</p>
                        <p>{comment.votesCount}</p>

                        <ArrowUp onClick={() => this.props.voteComment(+1,
                           this.props.postIdSelected,
                           comment.id)}>⬆ </ArrowUp>

                        <ArrowDown onClick={() => this.props.voteComment(-1,
                           this.props.postIdSelected,
                           comment.id)}>⬇</ArrowDown>
                     </CommentsContainer>
                  ))}

               </StyledCardsContainer>
            </StyledMainContainer>
         </div>
      );
   }
}

function mapStateToProps(state) {
   return {
      postDetails: state.posts.postDetails,
      postIdSelected: state.posts.postIdSelected,
   }
}

function mapDispatchToProps(dispatch) {
   return {
      goToLoginPage: () => dispatch(push(routes.root)),
      gotToFeedPage: () => dispatch(push(routes.feed)),
      getPostDetail: (postId) => dispatch(getPostDetail(postId)),
      postVote: (direction, postId) => dispatch(postVote(direction, postId)),
      createComment: (text, postId) => dispatch(createComment(text, postId)),
      voteComment: (direction, postId, commentId) => dispatch(voteComment(direction, postId, commentId))
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
