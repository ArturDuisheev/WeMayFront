import cafeCtgIcon from "../assets/images/term/food_ctg.svg";
import funCtgIcon from "../assets/images/term/fun_ctg.svg";
import persCtgIcon from "../assets/images/term/pers_ctg.svg";
import beautyCtgIcon from "../assets/images/term/beauty_ctg.svg";
import transportCtgIcon from "../assets/images/term/transport_ctg.svg";
import estateCtgIcon from "../assets/images/term/estate_ctg.svg";
import medicineCtgIcon from "../assets/images/term/medicine_ctg.svg";
import workCtgIcon from "../assets/images/term/work_ctg.svg";
import servicesCtgIcon from "../assets/images/term/services_ctg.svg";
import cafeCtgImage from "../assets/images/food_ctg.jpg";
import funCtgImage from "../assets/images/fun_ctg.jpg";
import servicesCtgImage from "../assets/images/services_ctg.jpg";
import persThingsCtgImage from "../assets/images/pers_ctg.jpg";
import beautyCtgImage from "../assets/images/beauty_ctg.jpg";
import transportCtgImage from "../assets/images/transport_ctg.jpg";
import estateCtgImage from "../assets/images/estate_ctg.jpg";
import medicineCtgImage from "../assets/images/medicine_ctg.jpg";
import wotkCtgImage from "../assets/images/work_ctg.jpg";
import promotionOneImage from "../assets/images/term/promotion_one.png";
import cocaColaImage from "../assets/images/term/coca-cola.svg";
import pepsiImage from "../assets/images/term/pepsi.svg";
import wildberriesImage from "../assets/images/term/wildberries.svg";
import shoroImage from "../assets/images/term/shoro.svg";
import kulikovImage from "../assets/images/term/kulikov.svg";
import promotion1Image from "../assets/images/term/promotion1.jpg";
import promotion2Image from "../assets/images/term/promotion2.jpg";
import promotion3Image from "../assets/images/term/promotion3.jpg";
import promotion4Image from "../assets/images/term/promotion4.jpg";
import promotion5Image from "../assets/images/term/promotion5.jpg";
import promotion6Image from "../assets/images/term/promotion6.jpg";
import geoMarkerIcon from "../assets/images/icons/geo-marker.svg";
import geoMarkerSelectedIcon from "../assets/images/icons/geo-marker-selected.svg";
import avaImage from "../assets/images/term/ava.png";
import { Icon } from "leaflet";
import dayjs from "dayjs";

export const customMarkerIcon = (isActive: boolean = false) =>
  new Icon({
    iconUrl: isActive ? geoMarkerSelectedIcon : geoMarkerIcon,
    iconSize: [104, 104],
  });

export const textLimit = (text: string, limit: number) => {
  return text.length > limit ? text.slice(0, limit - 3) + "..." : text;
};

export const pickerSx = {
  width: "100%",
  marginTop: "15px",
  "&.MuiButtonBase-root": { backgroundColor: "green" },
  "& .MuiFormLabel-root": {
    transform: "translate(16px, 12px) scale(1)",
    "&.Mui-focused": {
      color: "green",
    },
    "&.Mui-focused, &.MuiFormLabel-filled": {
      transform: "translate(14px, -9px) scale(0.75)",
    },
  },
  "& .MuiInputBase-root": {
    borderRadius: "24px",
    "& input": { padding: "12px 16px" },
    "&.Mui-focused fieldset": { borderColor: "green" },
  },
};

export const profileLinks = [
  { label: "Изменить профиль", link: "/profile", isEnd: true },
  { label: "Пароль", link: "/profile/password" },
];

const subCategories = [
  { name: "Все" },
  { name: "Офтальмология" },
  { name: "Стоматология" },
  { name: "Неврология" },
  { name: "Психология" },
];

export const categoriesData = [
  {
    name: "Кафе и рестораны",
    icon: cafeCtgIcon,
    image: cafeCtgImage,
    subCategories,
  },
  {
    name: "Развлечения",
    icon: funCtgIcon,
    image: funCtgImage,
    subCategories,
  },
  {
    name: "Личные вещи",
    icon: persCtgIcon,
    image: persThingsCtgImage,
    subCategories,
  },
  {
    name: "Красота и уход",
    icon: beautyCtgIcon,
    image: beautyCtgImage,
    subCategories,
  },
  {
    name: "Транспорт",
    icon: transportCtgIcon,
    image: transportCtgImage,
    subCategories,
  },
  {
    name: "Недвижимость",
    icon: estateCtgIcon,
    image: estateCtgImage,
    subCategories,
  },
  {
    name: "Медицина",
    icon: medicineCtgIcon,
    image: medicineCtgImage,
    subCategories,
  },
  {
    name: "Работа",
    icon: workCtgIcon,
    image: wotkCtgImage,
    subCategories,
  },
  {
    name: "Услуги",
    icon: servicesCtgIcon,
    image: servicesCtgImage,
    subCategories,
  },
];

export const menuData = [
  { label: "Главная", link: "/" },
  { label: "О нас", link: "/about" },
  { label: "Войти" },
];

export const promotionsSliderData = [
  { name: " Подарки для неё и для него", image: promotionOneImage },
  { name: " Подарки для и для него", image: promotionOneImage },
  { name: " Подарки и для него", image: promotionOneImage },
];

export const companiesData = [
  {
    link: "/company/1",
    logo: cocaColaImage,
    promotionsCount: 14,
    maxDiscounts: 50,
  },
  {
    link: "/company/1",
    logo: pepsiImage,
    promotionsCount: 14,
    maxDiscounts: 50,
  },
  {
    link: "/company/1",
    logo: wildberriesImage,
    promotionsCount: 14,
    maxDiscounts: 50,
  },
  {
    link: "/company/1",
    logo: shoroImage,
    promotionsCount: 14,
    maxDiscounts: 50,
  },
  {
    link: "/company/1",
    logo: kulikovImage,
    promotionsCount: 14,
    maxDiscounts: 50,
  },
];

const review = {
  ava: avaImage,
  name: "Алина Абаева",
  pastTense: "7 дней назад",
  comment: "Купон за 990 cом. и доплата на месте: 2000 cом",
  likes: 15,
};

const promotionRest = {
  contacts: ["+ 0 502 155 122", "+ 0 312 155 122"],
  workTime: "С 10:00 до 22:00 ежедневно",
  images: [
    promotion1Image,
    promotion2Image,
    promotion3Image,
    promotion4Image,
    promotion5Image,
    promotion6Image,
  ],
  end: "04д : 14ч : 25 мин",
  description: `Вы можете предъявить купон в электронном или распечатанном виде.
Один человек может купить неограниченное количество купонов для себя или в подарок.
В стоимость купона на SPA-программу «Сокровища Клеопатры» входит:
— распаривание в кедровой бочке с ингаляцией (мята, эвкалипт, лимон) — 15 минут;
— нанесение нежного медово-солевого мусса-пилинга на все тело — 15 минут;
— принятие душа — 5 минут;
— грязевое обертывание с минералами Мертвого моря для всего тела — 30 минут;
— принятие душа — 5 минут;
— индийский oil-массаж всего тела с применением натуральных ароматических масел на основе вытяжек из тропических растений и фруктов — 50 минут;
— приветственный напиток на выбор и чайная церемония со сладостями (орехи и сухофрукты);
— SPA-музыка, ароматерапия и консультация массажиста.Продолжительность SPA-программы — 120 минут.
Дополнительные преимущества:
— обязательна предварительная запись по телефону
— при записи необходимо сообщить номер купона и код бронирования;
— рекомендуется подтвердить бронь по телефону не более чем за 12 часов;
— если бронь не была подтверждена, администрация салона вправе отменить и перенести запись на удобное для клиента и свободное в салоне время;
— если участник акции опаздывает более чем на 15 минут, то администрация салона вправе перенести процедуру на другое (удобное для персонала и клиента) время.
Прочие условия:
Предупреждаем о необходимости получения консультации у врача-специалиста по оказываемым услугам и противопоказаниям.`,
  address: {
    name: "ул. Токтогула 119А",
    coordinates: [42.87919742569284, 74.61855424382648],
  },
  reviews: [review, review, review],
};

export const promotionsData = [
  {
    name: "SPA-программа в SPA-салоне Shy Lady",
    initPrice: 1500,
    price: 750,
    discountPercentage: 50,
    likes: 15,
    image: promotion1Image,
    link: "/spa",
    ...promotionRest,
  },
  {
    name: "Полет на воздушном шаре с трансфером из Москвы на высоте 1500 метров",
    initPrice: 13980,
    price: 6570,
    discountPercentage: 50,
    likes: 15,
    image: promotion2Image,
    link: "/fly",
    ...promotionRest,
  },
  {
    name: "Комплексная гигиена полости рта, лечение кариеса с установкой пломбы, удаление или эстетическая реставрация",
    initPrice: 1500,
    price: 750,
    discountPercentage: 50,
    likes: 15,
    image: promotion3Image,
    link: "/gigiena",
    ...promotionRest,
  },
  {
    name: "Шиномонтаж и балансировка четырех колес радиусом до R20 в сети «Автостол»",
    initPrice: 1200,
    price: 600,
    discountPercentage: 50,
    likes: 15,
    image: promotion4Image,
    link: "/shinomontage",
    ...promotionRest,
  },
  {
    name: "Скидка до 72%. Осетинские пироги от пекарни «ИрПирог»",
    initPrice: 3300,
    price: 990,
    discountPercentage: 50,
    likes: 15,
    image: promotion5Image,
    link: "/pirogi",
    ...promotionRest,
  },
  {
    name: "Блюда меню и напитки в ирландском пабе Law & Son",
    initPrice: 220,
    price: 110,
    discountPercentage: 50,
    likes: 15,
    image: promotion6Image,
    link: "/bluda",
    ...promotionRest,
  },
];

export const promotionsTypeData = [
  {
    name: "Скидка",
    value: "discount",
    sub: [
      {
        name: "От 40%",
      },
    ],
  },
  { name: "Бонус", value: "bonus" },
  { name: "Сертификат", value: "certificate" },
  { name: "Розыгрыш", value: "draw" },
];

export const sortData = [
  { label: "По умолчанию" },
  { label: "Сначала новые" },
  { label: "Самые популярные" },
  { label: "По цене (низкая-высокая)" },
  { label: "По цене (высокая-низкая)" },
];

export const initialScheduleTime = {
  from: dayjs().set("hour", 9).set("minutes", 0),
  to: dayjs().set("hour", 9).set("minutes", 0),
};

export const weekDays = [
  {
    day: { value: "monday", label: "Понедельник" },
    isActive: true,
    time: initialScheduleTime,
  },
  {
    day: { value: "tuesday", label: "Вторник" },
    isActive: true,
    time: initialScheduleTime,
  },
  {
    day: { value: "wednesday", label: "Среда" },
    isActive: true,
    time: initialScheduleTime,
  },
  {
    day: { value: "thursday", label: "Четверг" },
    isActive: true,
    time: initialScheduleTime,
  },
  {
    day: { value: "friday", label: "Пятница" },
    isActive: true,
    time: initialScheduleTime,
  },
  {
    day: { value: "saturday", label: "Суббота" },
    isActive: false,
    time: initialScheduleTime,
  },
  {
    day: { value: "sunday", label: "Воскресенье" },
    isActive: false,
    time: initialScheduleTime,
  },
];
