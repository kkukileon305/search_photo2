import axios from 'axios';

export interface PhotoData {
  alt_description: string;
  description: string;
  urls: {
    raw: string;
    regular: string;
    small: string;
  };
}

interface UnsplashData {
  results: PhotoData[];
  total: number;
  total_pages: number;
}

const PHOTO_PER_PAGE = 6;

export const getUnsplashSnapshot = async (item: string, page: number) => {
  const URL = `https://api.unsplash.com/search/photos?query=${item}&per_page=${PHOTO_PER_PAGE}&page=${page}`;
  const KEY = 'iyCdUw8hjdZTKJZqBPPd3LL9QjVfjcqwH4kY0vA0LM8';

  try {
    const response = await axios.get<UnsplashData>(URL, {
      headers: {
        Authorization: `Client-ID ${KEY}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
