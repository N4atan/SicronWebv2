import { useEffect, useState } from "react";
import "./ContainerPage.css";

type Props = {
  variant: "a-left" | "a-right" | "mobile";
  children?: React.ReactNode;
  isPageUser?: boolean;
};

export default function ContainerPage(props: Props) {
  const [isMobilePortrait, setIsMobilePortrait] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px) and (orientation: portrait)");

    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsMobilePortrait(event.matches);
    };

    handleChange(mediaQuery);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const configStyle = isMobilePortrait && props.isPageUser
    ? "mobile-user"
    : isMobilePortrait ? "mobile" : props.variant;
  
  
  return <div className={`container-page ${configStyle}`}> {props.children} </div>;
}