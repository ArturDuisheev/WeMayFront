import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { profileRoutes } from "../../routes/routes";
import Navigation from "../../components/profilePage/navigation/Navigation";
import ava from "../../assets/images/icons/ava.svg";
import { useProfile } from "../../hooks/useProfile";
import { useClearCategory } from "../../hooks/useClearCategory";

const ProfilePage: FC = () => {
  useClearCategory();
  const { data: profile, isError } = useProfile();

  if (!localStorage.getItem("wemay-access-token") || isError)
    return <Navigate to="/" replace />;

  return (
    <div className="pt-40 pb-100 bg-gray text-almost-black font-mulish">
      <div className="container-two">
        <section className="rounded-[16px] py-[32px] px-40 bg-white2 flex gap-[16px]">
          <img
            alt="ava"
            src={profile?.image || ava}
            className="w-[64px] h-[64px] rounded-[50%] object-cover object-center"
          />
          <div className="flex flex-col justify-between">
            <h1 className="text-[24px] font-bold font-montserrat">
              {profile?.fullname}
            </h1>
            <a href="mailto:Samplesample@gmail.сom">{profile?.email}</a>
          </div>
        </section>
        <div className="mt-20 flex gap-[13px] lt:flex-col">
          <Navigation />
          <section className="rounded-[16px] pt-40 pb-[75px] px-40 flex-auto bg-white2 tb:px-[16px]">
            <Routes>
              {profileRoutes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
            </Routes>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
