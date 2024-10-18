import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Bell, User } from 'lucide-react';

const HeaderWrapper = styled.header`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: bold;
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
`;

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <HeaderWrapper>
      <Logo to="/">LMS</Logo>
      {isAuthenticated && (
        <Nav>
          <NavLink to="/courses">Courses</NavLink>
          <NavLink to="/assignments">Assignments</NavLink>
          <NavLink to="/forums">Forums</NavLink>
          <IconButton>
            <Bell size={20} />
          </IconButton>
          <IconButton>
            <User size={20} />
          </IconButton>
          <NavLink to="/" onClick={logout}>Logout</NavLink>
        </Nav>
      )}
    </HeaderWrapper>
  );
};

export default Header;