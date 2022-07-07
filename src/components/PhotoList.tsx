import { forwardRef } from 'react';
import styled from 'styled-components';
import { PhotoData } from '../API';

interface PhotoListProps {
  photoData: PhotoData;
  setFavoriteList: React.Dispatch<React.SetStateAction<PhotoData[]>>;
  favoriteList: PhotoData[];
}

const StyledList = styled.li`
  width: 100%;
  margin-bottom: 20px;

  img {
    display: block;
    width: 100%;
    min-height: 200px;
    box-shadow: 0 4px 10px 4px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  h3 {
    margin-bottom: 0;
  }
`;

const PhotoList = forwardRef<HTMLLIElement, PhotoListProps>(({ photoData, setFavoriteList, favoriteList }, ref) => {
  return (
    <StyledList ref={ref}>
      <img src={photoData.urls.regular} alt={photoData.alt_description} onClick={() => setFavoriteList([...favoriteList, photoData])} />
      <h3>{photoData.alt_description ? photoData.alt_description : '설명없음'}</h3>
    </StyledList>
  );
});

export default PhotoList;
