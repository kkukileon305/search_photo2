import React, { useEffect, useRef, useState } from 'react';
import { getUnsplashSnapshot, PhotoData } from './API';
import FavoriteAside from './components/FavoriteList';
import PhotoList from './components/PhotoList';
import SkeletonList from './components/SkeletonList';
import StyledContainer from './styles/StyledContainer';
import StyledForm from './styles/StyledForm';

const App = () => {
  const [photoList, setPhotoList] = useState<PhotoData[]>([]);
  const [favoriteList, setFavoriteList] = useState<PhotoData[]>([]);
  const [page, setPage] = useState(1);
  const [item, setItem] = useState<string>('');
  const [scrollItem, setScrollItem] = useState('');
  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastListRef = useRef(null);
  const [validation, setValidation] = useState('Write your keyword...');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          observer.disconnect();
          page < 5 && setPage(page + 1);
        }
      });
    },
    {
      threshold: 0.5,
    }
  );

  useEffect(() => {
    lastListRef.current && observer.observe(lastListRef.current);
    return () => {
      observer.disconnect();
    };
  }, [photoList]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!item) {
      setValidation('빈칸은 입력할 수 없습니다');
      return;
    }

    setValidation('Write your keyword...');
    setScrollItem(item);
    setPage(1);
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
    if (page !== 1 && page !== 5) {
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
    }
  };

  useEffect(() => {
    updatePhotoList();
  }, [page]);

  useEffect(() => {
    const scrollHandler = () => {
      const { scrollY } = window;
      scrollY > 30 && setScrolled(true);
      scrollY <= 30 && setScrolled(false);
    };

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <>
      <StyledContainer>
        <h2>사진 검색하기</h2>
        <StyledForm onSubmit={submitHandler}>
          <input type='text' onChange={(e) => setItem((e.target as HTMLInputElement).value)} name='item' placeholder={validation} />
          <input type='submit' value='Search' />
        </StyledForm>
        <ul>
          {photoList.map((e, i) => (
            <PhotoList
              key={i} //
              photoData={e}
              ref={i === photoList.length - 1 ? lastListRef : undefined}
              setFavoriteList={setFavoriteList}
              favoriteList={favoriteList}
            />
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
      <FavoriteAside scrolled={scrolled} />
    </>
  );
};

export default App;
