import React, { useState } from 'react';
import styled from 'styled-components';

const CommentFieldWrapper = styled.div``;

const TextAreaWrapper = styled.div`
  width: 100%;
  max-width: 1500px;
  background: #111;
  position: relative;
`;

const StyledTextArea = styled.textarea`
  position: absolute;
  bottom: 0;
  padding: 0.6rem 0.8rem;
  outline: 0;
  overflow: hidden;
  font-size: 1rem;
  transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1);
  border: 0;
  background-color: #111;
  border-left: 5px solid #777;
  color: #fff;
  outline: none;
  resize: none;
  font-family: 'Roboto', sans-serif;
  width: 100%;
  height: 35px;

  &:focus {
    border-left: 15px solid #624694;
    height: 135px;
    box-shadow: 0 -10px 10px -5px rgba(0, 0, 0, 0.3);
  }

  &::placeholder {
    color: #777;
    font-family: 'Roboto', sans-serif;
  }
`;

const PostCommentButton = styled.button`
  outline: 0;
  padding: 0.5rem 1rem;
  background-color: #946ddc;
  border: 0;
  border-radius: 5px;
  border-bottom: 2px solid #624694;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
`;

const PostCommentButtonWrapper = styled.div`
  display: flex;
  margin-right: 5px;
  margin-top: 5px;
`;
const PostCommentButtonText = styled.span`
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
  letter-spacing: 0.1rem;
`;

export default function PostComment(props) {
  const { handlePostComment } = props;
  const [commentText, setCommentText] = useState('');

  function handleInputChange(e) {
    setCommentText(e.target.value);
  }

  function resetInput() {
    setCommentText('');
  }

  return (
    <CommentFieldWrapper>
      <TextAreaWrapper>
        <StyledTextArea
          placeholder="Skriv en ny kommentar.."
          value={commentText}
          onChange={handleInputChange}
        />
      </TextAreaWrapper>
      <PostCommentButtonWrapper>
        <PostCommentButton
          onClick={() => {
            handlePostComment(commentText);
            resetInput();
          }}
        >
          <PostCommentButtonText>SEND</PostCommentButtonText>
        </PostCommentButton>
      </PostCommentButtonWrapper>
    </CommentFieldWrapper>
  );
}