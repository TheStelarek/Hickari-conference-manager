import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { logout } from '../api/firebase-user.js';

import { auth } from '../api/firebase-user';
import { useAuthState } from 'react-firebase-hooks/auth';
import { ReactComponent as Icon } from '../assets/down.svg';

import { isAdmin } from 'api/permission';

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState(false);
  const [admin, setAdmin] = useState(false);

  return (
    <Nav>
      <Logo href="/">
        Conference<span>Manager</span>
      </Logo>
      <Hamburger onClick={() => setIsOpen(!isOpen)}>
        <span />
        <span />
        <span />
      </Hamburger>
      <Menu isOpen={isOpen}>
        {user && <MenuLink href="/profile">Profile</MenuLink>}
        {!user && <MenuLink href="/register">Register</MenuLink>}
        {!user && <MenuLink href="/login">Login</MenuLink>}
        <MenuLink href="/Faq">Faq</MenuLink>
        {user && (
          <DropDownLi>
            <Dropbtn>
              Conference <StyledIcon />
            </Dropbtn>
            <DropDownContent>
              <SubA href="/add-conference">Add Conference</SubA>
              <SubA href="/conferences-list">Conference List</SubA>
            </DropDownContent>
          </DropDownLi>
        )}
        {user && admin && <MenuLink href="/users-list">Users List</MenuLink>}
        {user && (
          <MenuLink onClick={logout} to="/signin">
            Logout
          </MenuLink>
        )}
      </Menu>
    </Nav>
  );
};

const StyledIcon = styled(Icon)`
  width: 10px;
  height: 10px;
  fill: #f13030;
`;

const StyledLi = styled.li`
  display: flex;
`;

const Dropbtn = styled.div`
  display: inline-block;
  color: #f13030;
  text-align: center;
  padding: 14px 16px;
  font-size: 14px;

  text-decoration: none;
  cursor: context-menu;
  &:hover {
    background-color: #f13030;
    color: white;
    transition: all 0.3s ease-in;
  }
`;

const DropDownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const DropDownLi = styled(StyledLi)`
  display: inline-block;

  &:hover ${DropDownContent} {
    display: block;
  }
`;

const SubA = styled.a`
  color: #f13030;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  &:hover {
    color: #d142f5;
    transition: all 0.3s ease-in;
  }
`;

const MenuLink = styled.a`
  padding: 10px 20px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  color: white;
  transition: all 0.3s ease-in;
  font-size: 14px;
  &:hover {
    color: #8fabe0;
  }
`;

const Nav = styled.div`
  position: fixed;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: black;
  top: 0;
  left: 0;
  right: 0;
`;

const Logo = styled.a`
  padding: 10px 0;
  color: white;
  text-decoration: none;
  font-weight: 800;
  font-size: 24px;
  span {
    font-weight: 300;
    font-size: 14px;
  }
`;

const Menu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  @media (max-width: 768px) {
    overflow: hidden;
    flex-direction: column;
    max-height: ${({ isOpen }) => (isOpen ? '300px' : '0')};
    transition: max-height 0.3s ease-in;
    width: 100%;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  cursor: pointer;
  span {
    height: 2px;
    width: 25px;
    background: #7b7fda;
    margin-bottom: 3px;
    border-radius: 5px;
  }
  @media (max-width: 768px) {
    display: flex;
  }
`;
