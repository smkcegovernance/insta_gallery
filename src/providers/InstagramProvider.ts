import {Cookies} from '@react-native-cookies/cookies';
import {IPostResult, postFromJson} from '../models/IPost';

const fetchPost = async (
  url: string,
  cookies: Cookies,
): Promise<IPostResult> => {
  if (!verifyUrl(url)) {
    return Promise.resolve({
      success: false,
      message: 'Invalid link',
    });
  }
  const finalUrl = getUrl(url);
  const _cookies = Object.keys(cookies)
    .map((key: string) => `${cookies[key].name}:${cookies[key].value}`)
    .join(';');
  const response = await fetch(finalUrl, {
    headers: {
      cookies: _cookies,
    },
  });
  if (response.status > 400 && response.status < 500) {
    return Promise.resolve({
      success: false,
      message: 'Unauthorized access',
    });
  }
  if (response.status !== 200) {
    return Promise.resolve({
      success: false,
      message: 'Invalid response',
    });
  }
  const post = postFromJson(await response.json());
  return Promise.resolve({
    success: true,
    message: 'post found',
    data: {
      post: post,
    },
  });
};

const verifyUrl = (value: string): boolean => {
  const parsedValue: string = value.split('?')[0];
  const startValue: string = 'https://www.instagram.com/p/';
  const dummyPostValue: string = 'https://www.instagram.com/p/Cz3wVNXJvVa/';

  if (!parsedValue.startsWith(startValue)) {
    return false;
  }
  if (parsedValue.length < dummyPostValue.length) {
    return false;
  }
  return true;
};

const getUrl = (value: string): string => value.split('?')[0] + '?__a=1&__d=1';

const InstagramProvider = {
  fetchPost,
  verifyUrl,
  getUrl,
};
export default InstagramProvider;
