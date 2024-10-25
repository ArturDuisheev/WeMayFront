import { $api, $apiPrivate } from "../common/api";
import { IPromotion, IResults, IReview } from "../types/types";

interface IGetAllParams {
  page?: number;
  page_size?: number;
  company__name?: string;
  category__title?: string;
  type?: string;
  min_discount?: string;
  search?: string;
  is_daily?: boolean;
  popular?: "likes";
  highest_price?: "new_price" | "-new_price";
  new?: boolean;
}

interface ICreateReviewBody {
  body: string;
  promotion: number;
}

interface IGetReviewsParams {
  limit?: number;
  offset?: number;
}

class PromotionsService {
  getAll(params?: IGetAllParams) {
    return $api<IResults<IPromotion>>("promotions/all/", {
      params,
    });
  }
  getEndSoon() {
    return $api<IResults<IPromotion>>("promotions/end_soon/");
  }
  getFree() {
    return $api<IResults<IPromotion>>("promotions/free/");
  }
  getById(id: number) {
    return $api<IPromotion>(`promotions/${id}/`);
  }
  getLikes() {
    return $apiPrivate<IResults<IPromotion>>("promotions/likes/");
  }
  getFavourites() {
    return $apiPrivate<IResults<IPromotion>>("promotions/favorites/");
  }
  getMy() {
    return $apiPrivate<IResults<IPromotion>>("promotions/my/");
  }
  deleteMy(id: number) {
    return $apiPrivate.delete<IResults<IPromotion>>(`promotions/my/del/${id}`);
  }
  like(id: number) {
    return $apiPrivate.post(`promotions/like/${id}/`);
  }
  addToFavourite(id: number) {
    return $apiPrivate.post(`promotions/favorite/${id}/`);
  }
  create(body: FormData) {
    return $apiPrivate.post("promotions/create/", body, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  getReviews(promotionId: number, params?: IGetReviewsParams) {
    return $api<IResults<IReview>>(`reviews/promotion/${promotionId}/all/`, {
      params: { offset: 0, ...params },
    });
  }
  likeReview(id: number) {
    return $apiPrivate.post(`reviews/${id}/like/`);
  }
  unlikeReview(id: number) {
    return $apiPrivate.delete(`reviews/${id}/like/`);
  }
  createReview(body: ICreateReviewBody) {
    return $apiPrivate.post(`reviews/promotion/create/`, body);
  }
}

export default new PromotionsService();
