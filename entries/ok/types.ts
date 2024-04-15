export declare namespace OKMiniApp {
  interface FAPI {
    init: FAPIInit;
    Client: FAPIClient;
    Util: FAPIUtil;
  }

  type FAPIInit = (
    apiServer: string,
    apiConnection: string,
    onSuccess?: VoidFunction,
    onError?: VoidFunction
  ) => void;

  interface FAPIClient {
    call: FAPIClientCall;
  }

  type FAPIClientCall = <D>(
    params: FAPIClientCallParams,
    callback: FAPIClientCallCallback<D>
  ) => void;

  interface FAPIClientCallParams
    extends Record<string, number | boolean | string | string[]> {
    method: string;
    fields?: string;
  }

  type FAPIClientCallCallback<D> = (
    status: string,
    data: D,
    error: any
  ) => void;

  interface FAPIUtil {
    getRequestParameters: () => FAPIAuthParams;
  }

  interface FAPIAuthParams {
    api_server: string;
    apiconnection: string;
    application_key: string;
    auth_sig: string;
    mob: boolean;
    mob_platform: string;
    logged_user_id: number;
    session_key: string;
    session_secret_key: string;
    sig: string;
    custom_args: string;
  }

  type FAPIApiCallback = (method: string, result: any, data: any) => void;
}

// export type FAPIUserType = {
//   first_name: string;
//   last_name: string;
//   birthday: string;
//   gender: string;
//   uid: string;
//   pic320min?: string;
// };
//
// export type FAPICommunityType = {
//   category: string;
//   community: boolean;
//   name: string;
//   pin_notifications_off: boolean;
//   uid: string;
//   year_from: number;
//   year_to?: number;
// };
//
// export type FAPICommunitiesType = {
//   groups: FAPICommunityType[];
// };
//
// export type FAPIPhotoUploadUrlType = {
//   photo_ids: string[];
//   upload_url: string;
// };
//
// export type FAPIUploadedPhotoType = Record<string, { token: string }>;
//
// export type FAPIUploadedPhotosType = {
//   photos: FAPIUploadedPhotoType;
// };
//
// export type FAPIPhotoCommitType = {
//   photo_id: string;
//   assigned_photo_id: string;
//   status: 'SUCCESS' | 'FAILURE';
// };
//
// export type FAPIPhotosCommitType = {
//   photos: FAPIPhotoCommitType[];
// };
//
// export type FAPIGetPhotoInfoType = {
//   photo: FAPIPhotoType;
// };
//
// export type FAPIVideoUploadUrlType = {
//   video_id: string;
//   upload_url: string;
// };
//
// export type FAPIPhotoType = {
//   pic640x480?: string;
//   pic1024max?: string;
//   id: string;
// };
//
// export type FAPIAlbumType = {
//   aid: string;
//   main_photo: FAPIPhotoType;
//   photos_count: number;
//   title: string;
//   types: ('PUBLIC' | 'PRIVATE')[];
// };
//
// export type FAPIAlbumsType = {
//   albums: FAPIAlbumType[];
//   hasMore: boolean;
//   pagingAnchor: string;
// };
//
// export type FAPIPhotosType = {
//   photos: FAPIPhotoType[];
//   totalCount: number;
//   hasMore: boolean;
//   anchor: string;
// };
//
// export type FAPIUserFriendsListType = {
//   uids: string[];
// };
//
// export type FAPIUserFriendInfoType = {
//   uid: string;
//   first_name: string;
//   last_name: string;
//   pic128x128: string;
// };
//
// export type FAPIUserFriendsType = {
//   anchor: string;
//   has_more: boolean;
//   totalCount: number;
//   friends: FAPIUserFriendInfoType[];
// };
//
// export type FAPIVideoType = {
//   big_thumbnail_url: string;
//   duration: number;
//   id: string;
//   title: string;
//   total_views: number;
// };
//
// export type FAPIVideosType = {
//   videos: FAPIVideoType[];
//   hasMore: boolean;
//   anchor: string;
// };
