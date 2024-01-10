import { TResult } from "./TResult";

type TPostMedia = {
  url: string;
  width: number;
  height: number;
};

type TPostProductType = "clips" | "carousel_container";
export type TPost = {
  UserName: string;
  ProfilePicUrl: string;
  ProductType: TPostProductType;
  Media: TPostMedia[];
};

export type TPostResult = TResult & {
  data?: {
    post: TPost;
  };
};
export const postFromJson = (value: any): TPost => {
  return {
    UserName: value.items[0].user.full_name,
    ProfilePicUrl: value.items[0].user.profile_pic_url,
    ProductType: value.items[0].product_type,
    Media: ((value.items[0].carousel_media ?? []) as any).map(
      (media: any): TPostMedia =>
        media.image_versions2.candidates.find(
          (image: TPostMedia) =>
            image.width === media.original_width &&
            image.height === media.original_height
        )
    ),
  };
};
