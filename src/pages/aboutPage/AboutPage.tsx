import { FC } from "react";
import aboutImage from "../../assets/images/about.jpg";
import instagramIcon from "../../assets/images/icons/instagram.svg";
import telegramIcon from "../../assets/images/icons/telegram.svg";
import whatsappIcon from "../../assets/images/icons/whatsapp.svg";
import vkIcon from "../../assets/images/icons/vk.svg";
import facebookIcon from "../../assets/images/icons/facebook.svg";
import { useClearCategory } from "../../hooks/useClearCategory";

const AboutPage: FC = () => {
  useClearCategory();

  return (
    <section>
      <div
        style={{ backgroundImage: `url(${aboutImage})` }}
        className="relative bg-center bg-no-repeat bg-cover h-[324px] flex justify-center items-center   before:absolute before:top-0 before:left-0 before:bottom-0 before:right-0 before:bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,_#000000_100%)]"
      >
        <h1 className="title text-white z-10">О нас</h1>
      </div>
      <div className="container pt-60 pb-[140px] max-w-[950px] text-[rgba(51,51,51,1)] text-18">
        <h2>Твой пропуск в мир скидок до 90%</h2>
        <p className="my-[32px] leading-[23px]">
        От одежды и услуг, до развлечений. Абсолютно все категории.
Наш сервис - счастье для всех. Цена теперь не преграда.
Сделайте свою жизнь ярче и интереснее!
        </p>
        <h2 className="mb-[32px] text-[24px]">Контакты</h2>
        <a href="mailto:sampletext@gmail.com">Yes@wemay.kg</a>
        <h2 className="mt-[32px] mb-[24px] text-[24px]">+996(222)22-33-66</h2>
        <div className="flex gap-[16px]">
          <a href="">
            <img src={instagramIcon} alt="instagram" />
          </a>
          <a href="">
            <img src={telegramIcon} alt="telegram" />
          </a>
          <a href="">
            <img src={whatsappIcon} alt="whatsapp" />
          </a>
          <a href="">
            <img src={vkIcon} alt="vk" />
          </a>
          <a href="">
            <img src={facebookIcon} alt="facebook" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
