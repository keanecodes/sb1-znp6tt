import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 1rem 2rem;
  text-align: center;
`;

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <p>&copy; 2024 LMS. All rights reserved.</p>
    </FooterWrapper>
  );
};

export default Footer;