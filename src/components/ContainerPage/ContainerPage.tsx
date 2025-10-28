import { useEffect, useState } from "react";
import "./ContainerPage.css";

type Props = {
  variant: "a-left" | "a-right" | "a-no";
  children?: React.ReactNode;
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

  let configStyle =
    isMobilePortrait
      ? "a-no"
      : props.variant === "a-no"
      ? "a-no"
      : props.variant === "a-left"
      ? "a-left"
      : "a-right";

  return <div className={`container-page ${configStyle}`}>{props.children}</div>;
}