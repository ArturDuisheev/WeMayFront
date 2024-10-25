import clsx from "clsx";
import { ChangeEvent, Dispatch, FC } from "react";
import crossIcon from "../../../assets/images/icons/cross.svg";
import ReactInputMask from "react-input-mask";
// import Input from "../../ui/input/Input";

interface IContactsProps {
  contacts: string[];
  setContacts: Dispatch<React.SetStateAction<string[]>>;
}

const Contacts: FC<IContactsProps> = ({ contacts, setContacts }) => {
  const onChangeContact = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;
    let newContacts = [...contacts];
    newContacts[index] = value;
    setContacts(newContacts);
  };

  return (
    <>
      {contacts.map((contact, index) => (
        <div key={index} className="relative !mt-[16px]">
          <div className="mb-[16px] relative flex items-center text-14">
            <span className="absolute top-[14px] left-[20px]">+996</span>
            <ReactInputMask
              value={contact}
              mask="(999)-999-999"
              placeholder="(___)-___-___"
              className={clsx("box-input pl-[58px]", {
                "pr-[30px]": !!index,
              })}
              onChange={(event) => onChangeContact(event, index)}
            />
          </div>

          {!!index && (
            <button
              onClick={() =>
                setContacts((prev) => [
                  ...prev.slice(0, index),
                  ...prev.slice(index + 1),
                ])
              }
              className="absolute top-[16px] right-[16px]"
            >
              <img src={crossIcon} alt="cross" className="w-[14px] h-[14px]" />
            </button>
          )}
        </div>
      ))}
    </>
  );
};

export default Contacts;
