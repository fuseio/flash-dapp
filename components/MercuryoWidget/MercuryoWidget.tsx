import {useEffect, useRef} from "react";
import {NEXT_PUBLIC_MERCURYO_WIDGET_SCRIPT_SRC} from "@/lib/config";
import {mercuryoWidgetConfig} from "@/lib/config";
import useUser from "@/hooks/useUser";

declare global {
  interface Window {
    mercuryoWidget: any;
  }
}
export const MercuryoWidget = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {user} = useUser();

  useEffect(() => {
    if (!window.mercuryoWidget) {
      const script = document.createElement("script");
      script.src = NEXT_PUBLIC_MERCURYO_WIDGET_SCRIPT_SRC;
      script.async = true;
      script.onload = () => runWidget();
      document.head.appendChild(script);
    } else {
      runWidget();
    }
    function runWidget() {
      if (!window.mercuryoWidget || !containerRef.current) return;
      containerRef.current.innerHTML = "";
      let result = window.mercuryoWidget.run({
        ...mercuryoWidgetConfig,
        address: user?.safeAddress,
        host: containerRef.current,
      });
      console.log(result);
    }
    return () => {
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, [user]);
  return <div className="h-full w-full" ref={containerRef} />;
};
