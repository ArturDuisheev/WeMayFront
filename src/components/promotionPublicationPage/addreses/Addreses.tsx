import { FC, useEffect, useState } from "react";
import geoIcon from "../../../assets/images/icons/geo.svg";
import Modal from "../../ui/modal/Modal";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import mapService from "../../../services/mapService";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../ui/loading/Loading";

interface ICoordinates {
  lat: number;
  lng: number;
}

interface Props {
  address: string;
  setAddress: (value: string) => void;
}

const Addreses: FC<Props> = ({ address, setAddress }) => {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [coordinates, setCoordinates] = useState<ICoordinates>({
    lat: 0,
    lng: 0,
  });

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["markers-publicate"],
    queryFn: () =>
      mapService.getByCoordinates(coordinates.lat, coordinates.lng),
    select: ({ data }) => data,
    enabled: false,
  });

  useEffect(() => {
    coordinates.lat && coordinates.lng && refetch();
  }, [coordinates]);

  useEffect(() => {
    data?.display_name && setAddress(data.display_name);
  }, [data]);

  const LocationFinderDummy = () => {
    useMapEvents({
      click(e) {
        setCoordinates(e.latlng);
        setIsMapOpen(false);
      },
    });
    return null;
  };

  return (
    <div>
      <h3 className="mb-[8px] title-3">Адрес</h3>
      <button
        onClick={() => setIsMapOpen(true)}
        className="relative box-input flex gap-[6px] items-center"
      >
        <img src={geoIcon} alt="geo" />
        {isFetching ? (
          <Loading
            className="left-[34px] right-auto"
            iconClassName="w-[20px] h-[20px]"
          />
        ) : (
          <span>{address || "Выберите адрес"}</span>
        )}
      </button>
      <Modal
        isOpen={isMapOpen}
        close={() => setIsMapOpen(false)}
        contentStyle="relative w-full max-w-[1012px] h-full max-h-[800px] flex justify-center items-center overflow-hidden"
      >
        <MapContainer
          zoom={12}
          center={[42.8670976, 74.579968]}
          className="w-full h-full z-[5]"
        >
          <TileLayer
            // @ts-ignore
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationFinderDummy />
        </MapContainer>
      </Modal>
    </div>
  );
};

export default Addreses;
