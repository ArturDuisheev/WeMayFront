import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { Transition } from "react-transition-group";
import { IPromotion } from "../../types/types";
import { customMarkerIcon } from "../../data/data";
import { Link } from "react-router-dom";
import PromotionCard from "../promotionCard/PromotionCard";
import clsx from "clsx";
import crossIcon from "../../assets/images/icons/cross.svg";
import "leaflet/dist/leaflet.css";
import { useQueries, useQuery } from "@tanstack/react-query";
import promotionService from "../../services/promotionService";
import mapService from "../../services/mapService";
import Loading from "../ui/loading/Loading";

interface IMapProps {
  isOpen: boolean;
  close: () => void;
}

export interface IMapMarkerProps extends IPromotion {
  addresses: { lat: number; lon: number };
  setClickedPromotion: Dispatch<SetStateAction<IPromotion>>;
  setIsPromotionOpen: Dispatch<SetStateAction<boolean>>;
}

const MapMarker: FC<IMapMarkerProps> = ({
  addresses,
  setClickedPromotion,
  setIsPromotionOpen,
  ...promotion
}) => {
  if (!addresses) return null;

  return (
    <Marker
      // @ts-ignore
      position={[addresses.lat, addresses.lon]}
      icon={customMarkerIcon()}
      eventHandlers={{
        click: () => {
          setClickedPromotion(promotion);
          setIsPromotionOpen(true);
        },
      }}
    ></Marker>
  );
};

const Map: FC<IMapProps> = ({ isOpen, close }) => {
  const [isPromotionOpen, setIsPromotionOpen] = useState(false);
  const [clickedPromotion, setClickedPromotion] = useState<IPromotion>(
    {} as IPromotion
  );

  const { data: promotions, isLoading } = useQuery({
    queryKey: ["promotions"],
    queryFn: () => promotionService.getAll(),
    select: ({ data }) => data,
    enabled: false,
  });

  const promotionsMarkers = useQueries({
    queries: promotions?.results
      ? promotions.results.map((promotion) => ({
          queryKey: ["promotion-addresses", promotion.id],
          queryFn: () => mapService.getByName(promotion.address),
          // @ts-ignore
          select: ({ data }) => ({
            addresses: { lat: data[0].lat, lon: data[0].lon },
            ...promotion,
          }),
          enabled: !!promotion.address,
        }))
      : [],
    combine: (results) => ({
      data: results.map((result) => result.data),
      isLoading: results.some((result) => result.isLoading),
    }),
  });

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }, [isOpen]);

  return (
    <Transition in={isOpen} timeout={500} mountOnEnter unmountOnExit>
      {(state) => (
        <div
          onClick={() => state === "entered" && close()}
          className={clsx(
            "fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-[rgba(0,0,0,0.25)] z-[100]",
            {
              "animate-[open-modal-wrapper_0.5s_forwards]":
                state === "entering",
              "animate-[open-modal-wrapper_0.5s_forwards_reverse]":
                state === "exiting",
            }
          )}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative px-[16px] py-20 w-full max-w-[1044px] h-[80%] flex justify-center items-center"
          >
            {(promotionsMarkers.isLoading || isLoading) && (
              <Loading className="mx-[16px] my-20 bg-[rgba(0,0,0,0.3)]" />
            )}
            <button
              onClick={close}
              className="absolute top-[26px] right-[26px] z-[10]"
            >
              <img src={crossIcon} alt="cross" />
            </button>
            <MapContainer
              // @ts-ignore
              zoom={12}
              center={[42.8670976, 74.579968]}
              className="w-full h-full z-[5]"
            >
              <TileLayer
                // @ts-ignore
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {promotionsMarkers.data?.map((promotion, key) => (
                // @ts-ignore
                <MapMarker
                  key={key}
                  setClickedPromotion={setClickedPromotion}
                  setIsPromotionOpen={setIsPromotionOpen}
                  {...promotion}
                />
              ))}
            </MapContainer>
            <div
              onClick={(e) => e.stopPropagation()}
              className={clsx(
                "absolute rounded-[16px] p-[16px] max-w-[570px] w-full flex flex-col bg-white z-10 pointer-events-none opacity-0 trans-def",
                { "opacity-100 pointer-events-auto": isPromotionOpen }
              )}
            >
              <button
                onClick={() => setIsPromotionOpen(false)}
                className="mb-[22px] self-end"
              >
                <img
                  src={crossIcon}
                  alt="cross"
                  className="w-[12px] h-[12px]"
                />
              </button>
              <PromotionCard {...clickedPromotion} disabled />
              <Link
                to={`/promotion/${clickedPromotion.id}`}
                className="btn mt-[32px] py-[8px] text-center font-normal"
              >
                Узнать больше
              </Link>
            </div>
          </div>
        </div>
      )}
    </Transition>
  );
};

export default Map;
