import React from 'react';
import styled from 'styled-components';

const StyledList = styled.li`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;

  div {
    background-color: lightgray;
  }

  div.imgSkeleton {
    width: 100%;
    height: 200px;
  }

  div.h3Skeleton {
    margin-top: 20px;
    height: 30px;
  }
`;

const SkeletonList = () => {
  return (
    <StyledList>
      <div className='imgSkeleton'></div>
      <div className='h3Skeleton'></div>
    </StyledList>
  );
};

export default SkeletonList;
