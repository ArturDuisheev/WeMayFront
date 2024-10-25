import { useEffect } from "react";
import { useAppDispatch } from "../store/store";
import { clear } from "../store/slices/filterSlice";

export const useClearCategory = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clear());
  }, []);
};
