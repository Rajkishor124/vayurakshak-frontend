import { useContext } from "react";
import { LoadingContext } from "./LoadingContext";

export default function useLoading() {
  return useContext(LoadingContext);
}
