import React from 'react';
// import {useCookiesContext} from '../CookiesContext';

type INewDownloadProps = {
  children: React.ReactNode;
};
type INewDownloadContext = {
  isLoading: boolean;
  isDownloadValid: boolean;
  downloadUrl: string;
  setDownloadUrl: (value: string) => void;
  downloadLocation: string;
  setDownloadLocation: (value: string) => void;
};

const NewDownloadContext = React.createContext<INewDownloadContext>({
  isLoading: false,
  isDownloadValid: false,
  downloadUrl: '',
  setDownloadUrl() {},
  downloadLocation: '',
  setDownloadLocation() {},
});

export const useNewDownloadContext = () => React.useContext(NewDownloadContext);

export function NewDownloadProvider(props: INewDownloadProps) {
  // const {cookies} = useCookiesContext();

  const [isLoading] = React.useState<boolean>(false);
  const [downloadUrl, setDownloadUrl] = React.useState<string>('');
  const [downloadLocation, setDownloadLocation] = React.useState<string>('');

  const isDownloadValid = React.useMemo<boolean>(
    () => downloadUrl !== '' && downloadLocation !== '' && !isLoading,
    [downloadUrl, downloadLocation, isLoading],
  );

  const isDownloadUrlValid = React.useMemo(
    () => downloadUrl.includes('https://www.instagram.com/p/'),
    [downloadUrl],
  );

  const fetchUrl = React.useCallback(async () => {
    console.log('New Download Url');
    if (!isDownloadUrlValid) {
      return false;
    }
    var response = await fetch(downloadUrl, {
      method: 'GET',
      // headers: {
      //   "cookies": (cookies ?? ({} as any))
      //     .map((cookie: Cookie) => `${cookie.name}:${cookie:value}`)
      //     .join(';') as string,
      // },
    });
    var data = await response.json();
    console.log(data);
  }, [downloadUrl, isDownloadUrlValid]);

  React.useEffect(() => {
    fetchUrl();
  }, [fetchUrl]);

  return (
    <NewDownloadContext.Provider
      value={{
        isLoading,
        isDownloadValid,
        downloadUrl,
        downloadLocation,
        setDownloadUrl,
        setDownloadLocation,
      }}>
      {props.children}
    </NewDownloadContext.Provider>
  );
}
