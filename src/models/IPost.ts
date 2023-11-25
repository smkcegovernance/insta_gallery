import {IResult} from './IResult';

type IPostMedia = {
  url: string;
  width: number;
  height: number;
};

type IPostProductType = 'clips' | 'carousel_container';
export type IPost = {
  UserName: string;
  ProfilePicUrl: string;
  ProductType: IPostProductType;
  Media: IPostMedia[];
};

export type IPostResult = IResult & {
  data?: {
    post: IPost;
  };
};
export const postFromJson = (value: any): IPost => {
  console.log(
    ((value.items[0].carousel_media ?? []) as any).map((media: any) => ({
      Url: media.image_versions2.candidates.reduce(
        (maxRes: any, currentRes: any) =>
          (currentRes.height as number) > (maxRes.height as number)
            ? maxRes
            : currentRes,
      ),
    })),
  );
  return {
    UserName: value.items[0].user.full_name,
    ProfilePicUrl: value.items[0].user.profile_pic_url,
    ProductType: value.items[0].product_type,
    Media: ((value.items[0].carousel_media ?? []) as any).map(
      (media: any): IPostMedia =>
        media.image_versions2.candidates.find(
          (image: IPostMedia) =>
            image.width === media.original_width &&
            image.height === media.original_height,
        ),
    ),
  };
};
