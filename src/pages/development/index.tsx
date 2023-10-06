import Header from "../../components/sections/Header";
import Footer from "../../components/sections/Footer";
import Text from "../../components/atoms/Text";
import {useEffect, useState} from "react";

export default function Home() {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if(!hasMounted) {
    return;
  }

  return (
    <>
      <Header />
        <Text>Development</Text>
      <Footer />
    </>
  )
}
