import {useEffect, useRef} from "react";
import {NEXT_PUBLIC_MERCURYO_WIDGET_SCRIPT_SRC} from "@/lib/config";
import {mercuryoWidgetConfig} from "@/lib/config";
import useUser from "@/hooks/useUser";
import {createWidgetSignature} from "@/lib/utils";
import {getClientIp} from "@/lib/api";

declare global {
  interface Window {
    mercuryoWidget: any;
  }
}

export const MercuryoWidget = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {user} = useUser();

  useEffect(() => {
    let isMounted = true;

    const loadAndInitWidget = async () => {
      if (!user?.safeAddress || !containerRef.current) return;
      try {
        const ip = await getClientIp();
        const merchantTransactionId = crypto.randomUUID();
        const signature = await createWidgetSignature({
          address: user.safeAddress,
          secret: process.env.NEXT_PUBLIC_MERCURYO_SECRET_KEY || "",
          ip,
          merchantTransactionId,
        });
        const fullSignature = `v2:${signature}`;

        if (!window.mercuryoWidget) {
          await new Promise<void>((resolve) => {
            const script = document.createElement("script");
            script.src = NEXT_PUBLIC_MERCURYO_WIDGET_SCRIPT_SRC;
            script.async = true;
            script.onload = () => resolve();
            document.head.appendChild(script);
          });
        }

        if (window.mercuryoWidget && isMounted) {
          containerRef.current.innerHTML = "";

          const result = window.mercuryoWidget.run({
            ...mercuryoWidgetConfig,
            address: user.safeAddress,
            host: containerRef.current,
            signature: fullSignature,
            merchant_transaction_id: merchantTransactionId,
          });

          console.log("Widget initialized:", result);
        }
      } catch (error) {
        console.error("Error initializing Mercuryo widget:", error);
      }
    };

    loadAndInitWidget();

    return () => {
      isMounted = false;
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, [user]);

  return (
    <div
      className="min-h-[650px] w-full max-w-[400px] md:max-w-[450px]"
      ref={containerRef}
    />
  );
};
