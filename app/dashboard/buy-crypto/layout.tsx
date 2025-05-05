import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Buy Crypto Instantly",
  description:
    "Purchase crypto using your credit card, Apple Pay, or Google Pay. Fast, secure, and deposited straight to your account.",
};

export default function Layout({children}: {children: React.ReactNode}) {
  return <div>{children}</div>;
}
