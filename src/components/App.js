import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import Messages from './Messages';
import styled from 'styled-components';
import Categories from './Categories';
import Channels from './Channels';
import Flex from '../styleguides/Flex';
import Container from '../styleguides/Container';
import history from '../utils/history';
import goBack from '../utils/goBack';
import { arrowBack } from '../icons';
import { TitleContext } from '../context/AppTitleContext';
import { UserContext } from '../context/UserContext';
import CreateChannel from './CreateChannel';
import CreateCategory from './CreateCategory';

const AppTitleWrapper = styled.nav`
  background: #111;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  top: 0;
  z-index: 1;
  position: sticky;
  box-shadow: 0px 7px 10px 1px rgb(0, 0, 0, 0.4);
  border-bottom: 5px solid ${props => props.borderColor};
  height: 80px;
  transition: all 0.5s ease-in-out;
`;

const BackButton = styled.button`
  border: 0;
  padding: 0.5rem 1rem;
  background-color: transparent;
  margin-left: 1rem;
  cursor: pointer;
  transition: all 0.25s ease-in-out;

  @media all and (max-width: 600px) {
    margin-left: 0;
  }
`;

const AppTitle = styled.h1`
  color: #fff;
  font-size: 3rem;
  margin: 0;
  padding: 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 auto;
  text-align: center;
  white-space: nowrap;
  width: 80%;
  text-overflow: ellipsis;
  overflow: hidden;

  @media all and (max-width: 450px) {
    font-size: 1.4rem;
    width: 50%;
  }
`;

const Avatar = styled(Flex)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 2rem;

  @media all and (max-width: 600px) {
    margin-right: 1rem;
  }

  img {
    width: 100%;
    height: 100%;
  }
`;

export default function App(props) {
  const { state } = useContext(TitleContext);
  const userContext = useContext(UserContext);

  return (
    <>
      <Flex basis={'7%'}>
        <Container>
          <AppTitleWrapper borderColor={state.titleColor}>
            {history.location.pathname.includes('/') &&
            history.location.pathname !== '/' ? (
              <BackButton
                borderColor={state.titleColor}
                onClick={() => history.push(goBack(history.location.pathname))}
              >
                {arrowBack}
              </BackButton>
            ) : (
              <Flex basis={'25%'} />
            )}
            <AppTitle>{state.title}</AppTitle>
            <Avatar justify="flex-end">
              {userContext.data.loggedIn && (
                <img
                  src={userContext.data.profileImage}
                  alt={userContext.data.name}
                />
              )}
            </Avatar>
          </AppTitleWrapper>
        </Container>
      </Flex>
      <Switch>
        <Route path="/" exact component={Categories} />
        <Route path="/create" exact component={CreateCategory} />
        <Route path="/:categoryId" exact component={Channels} />
        <Route path="/:categoryId/create" exact component={CreateChannel} />
        <Route path="/:categoryId/:channelId" exact component={Messages} />
      </Switch>
    </>
  );
}
