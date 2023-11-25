import {Cookies} from '@react-native-cookies/cookies';
import {IPostResult, postFromJson} from '../models/IPost';

const fetchPost = async (
  url: string,
  cookies: Cookies,
): Promise<IPostResult> => {
  const _cookies = Object.keys(cookies)
    .map((key: string) => `${cookies[key].name}:${cookies[key].value}`)
    .join(';');
  const response = await fetch(url, {
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

const InstagramProvider = {
  fetchPost,
};
export default InstagramProvider;
