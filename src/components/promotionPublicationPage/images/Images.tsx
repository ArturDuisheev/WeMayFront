import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import basketIcon from "../../../assets/images/icons/basket.svg";
import clsx from "clsx";
import { ImageFile } from "../../../types/types";

interface Props {
  images: ImageFile[] | null;
  setImages: Dispatch<SetStateAction<ImageFile[] | null>>;
}

const Images: FC<Props> = ({ images, setImages }) => {
  const onChangeImages = (e: ChangeEvent<HTMLInputElement>) => {
    for (let i = 0; i < (e.target.files?.length || 0); i++) {
      const currentFile = e.target.files![i];
      setImages((prev) => [
        ...(prev || []),
        { file: currentFile, imageUrl: URL.createObjectURL(currentFile) },
      ]);
    }
  };

  const onClickDeleteImage = (currentId: number) => {
    setImages((prev) => prev!.filter((_, id) => id !== currentId));
  };

  return (
    <>
      <Swiper grabCursor slidesPerView="auto" spaceBetween={30}>
        {images?.map((image, key) => (
          <SwiperSlide key={`${image.file.name}-${key}`} className="w-fit">
            <button
              onClick={() => onClickDeleteImage(key)}
              className="relative rounded-[10px] w-[100px] h-[100px] flex justify-center items-center bg-cover bg-center bg-no-repeat overflow-hidden before:absolute before:top-0 before:bottom-0 before:left-0 before:right-0 before:trans-def hover:before:bg-[rgba(210,50,50,0.57)] *:hover:opacity-100"
              style={{
                backgroundImage: `url(${image.imageUrl})`,
              }}
            >
              <img
                src={basketIcon}
                alt="basket"
                className="w-[40px] h-[40px] opacity-0 trans-def"
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
      <label
        htmlFor="promotion-publication-image"
        className={clsx("box-btn block w-fit text-green", {
          "!mt-0": !images?.length,
        })}
      >
        Добавить фото
        <input
          onChange={onChangeImages}
          multiple
          id="promotion-publication-image"
          type="file"
          accept=".jpg, .jpeg, .png"
          className="hidden"
        />
      </label>
    </>
  );
};

export default Images;
