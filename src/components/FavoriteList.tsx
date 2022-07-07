import React from 'react';
import styled from 'styled-components';
import { IoIosArrowUp } from 'react-icons/io';

interface FavAsideProps {
  scrolled: boolean;
}

const StyledAside = styled.aside<FavAsideProps>`
  position: fixed;
  max-width: 400px;
  width: 100%;
  height: 30px;
  bottom: 0px;
  background-color: lightgreen;
  transition-duration: 0.3s;
  transform: translateY(${({ scrolled }) => (scrolled ? 0 : 60)}px);

  button {
    background-color: white;
    border: 4px solid lightgreen;
    width: 60px;
    height: 60px;
    position: absolute;
    margin: 0;
    padding: 0;
    left: calc(50% - 30px);
    top: -30px;
    border-radius: 30px;

    &::after {
      content: '';
      position: absolute;
    }
  }
`;

const FavoriteAside = ({ scrolled }: FavAsideProps) => {
  return (
    <StyledAside scrolled={scrolled}>
      <button onClick={() => window.scrollTo({ behavior: 'smooth', top: 0 })}>
        <IoIosArrowUp size={40} color='lightgreen' />
      </button>
    </StyledAside>
  );
};

export default FavoriteAside;
