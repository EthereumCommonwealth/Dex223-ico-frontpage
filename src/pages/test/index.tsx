import Header from "../../components/sections/Header";
import Footer from "../../components/sections/Footer";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import NeonBlock from "../../components/organisms/NeonBlock";
import CubeImage from "../../assets/images/cube.svg";
import ArticleHeading from "../../components/atoms/ArticleHeading";
import styles from "../../styles/Development.module.scss";
import clsx from "clsx";
import DevelopmentReports from "../../components/sections/DevelopmentReports";
import References from "../../components/sections/References";
import Spacer from "../../components/atoms/Spacer";
import Structure from "../../components/sections/Structure";
import { throttle } from 'throttle-debounce';
import {create} from "zustand";
import {persist} from "zustand/middleware";

const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F
  const [data, setData] = useState<F>()

  useEffect(() => {
    setData(result)
  }, [result])

  return data
}

export const useBearStore = create<{bears: number, addABear: () => void}>()(
  persist(
    (set, get) => ({
      bears: 0,
      addABear: () => set({ bears: get().bears + 1 }),
    }),
    {
      name: 'food-storage',
    }
  )
)
export default function Home() {
  const bears = useStore(useBearStore, (state) => state.bears)
  const data = useBearStore();
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
    document.getElementById("__next").className = "overflow-hidden";
  }, []);

  if(!hasMounted) {
    return null;
  }

  console.log(data);
  return (
    <>
      <Header/>
      <div style={{color: "#FFF"}}>{bears}</div>
        <button onClick={() => data.addABear()}>Add bear</button>
      <Footer/>
    </>
  )
}
