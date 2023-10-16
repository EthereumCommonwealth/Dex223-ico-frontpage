import React, {useEffect, useRef} from "react";
import styles from "./Structure.module.scss";
import NeonBlock from "../src/components/organisms/NeonBlock";
import ArticleHeading from "../src/components/atoms/ArticleHeading";
import clsx from "clsx";
import CubeImage from "../src/assets/images/cube.svg";
import {useIntersectionObserver} from "../src/hooks/useIntersectionObserver";

export default function Structure({refEl}) {
  const structureEntryRef = useRef();
  // const structureScrollEntry = useIntersectionObserver(structureEntryRef, {threshold: 0.5});

  // const trackScrollRef = useRef();
  //
  // useEffect(() => {
  //
  //   function logPositions() {
  //     console.log(Boolean(trackScrollRef?.current));
  //     if(trackScrollRef?.current) {
  //       console.log(trackScrollRef.current.getBoundingClientRect().top);
  //       if(trackScrollRef.current.getBoundingClientRect().top < 0) {
  //         setActiveTab();
  //       }
  //     }
  //   }
  //
  //   window.addEventListener("scroll", logPositions);
  //
  //   return () => {
  //     window.removeEventListener("scroll", logPositions);
  //   }
  // }, [setActiveTab]);


  return <div>
    <div ref={refEl} className={styles.topRef} />
    <NeonBlock anchor="structure" noAnimation onlyBottom icon="architecture" color="purple" overlineText="Structure"
               leftContent={
                 <>
                   <ArticleHeading text="Lorem ipsum dolor sit amet"/>
                   <div className={styles.paragraphs}>
                     <p className={styles.text}>Lorem ipsum dolor sit amet consectetur. Volutpat convallis cursus
                       sem
                       fringilla
                       dictum sit id et dolor. Nisl massa amet posuere eu ac id massa. In tincidunt porta
                       tortor scelerisque lobortis auctor. Sed aliquet pellentesque aliquet amet turpis.
                       Sem cras turpis in eget a orci vel. Purus eu sed vel faucibus.
                     </p>
                     <p className={styles.text}>Lorem ipsum dolor sit amet consectetur. Lorem amet condimentum at
                       vestibulum dui.
                       Enim justo molestie non elit posuere. Ut et consequat sed viverra. Risus habitasse
                       ultrices egestas suspendisse viverra velit et sollicitudin facilisi. Urna dapibus
                       arcu nam nibh accumsan a pellentesque aliquam. Ullamcorper suspendisse egestas
                       potenti cursus. Auctor in.
                     </p>
                   </div>
                 </>
               }
               rightContent={
                 <div ref={structureEntryRef} className={clsx(styles.rightContent, "animated")}>
                   <CubeImage/>
                 </div>
               }
    />
  </div>
}
