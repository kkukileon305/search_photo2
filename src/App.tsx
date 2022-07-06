import React, { useEffect, useRef, useState } from 'react';
import { getUnsplashSnapshot, PhotoData } from './API';
import PhotoList from './components/PhotoList';
import SkeletonList from './components/SkeletonList';
import StyledContainer from './styles/StyledContainer';
import StyledForm from './styles/StyledForm';

const App = () => {
  const [photoList, setPhotoList] = useState<PhotoData[]>([]);
  const [page, setPage] = useState(1);
  const [item, setItem] = useState<string>('');
  const [scrollItem, setScrollItem] = useState('');
  const [loading, setLoading] = useState(false);
  const lastListRef = useRef(null);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio > 0) {
        observer.disconnect();
        page < 3 && setPage(page + 1);
      }
    });
  });

  useEffect(() => {
    lastListRef.current && observer.observe(lastListRef.current);
    return () => {
      observer.disconnect();
    };
  }, [photoList]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setScrollItem((e.target as HTMLFormElement).item.value);
    setLoading(true);
    try {
      const unSplashData = await getUnsplashSnapshot(item, page);
      if (unSplashData) {
        setPhotoList(unSplashData.results);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const updatePhotoList = async () => {
    setLoading(true);
    try {
      const unSplashData = await getUnsplashSnapshot(scrollItem, page);
      if (unSplashData) {
        setPhotoList([...photoList, ...unSplashData.results]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    updatePhotoList();
  }, [page]);

  return (
    <StyledContainer>
      <h2>사진 검색하기</h2>
      <StyledForm onSubmit={submitHandler}>
        <input type='text' onChange={(e) => setItem((e.target as HTMLInputElement).value)} name='item' />
        <input type='submit' value='Search' />
      </StyledForm>
      <ul>
        {photoList.map((e, i) => (
          <PhotoList key={i} photoData={e} ref={i === photoList.length - 1 ? lastListRef : undefined} />
        ))}
        {loading && (
          <>
            <SkeletonList />
            <SkeletonList />
            <SkeletonList />
            <SkeletonList />
            <SkeletonList />
            <SkeletonList />
          </>
        )}
      </ul>
    </StyledContainer>
  );
};

export default App;
