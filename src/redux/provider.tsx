"use client";

import { Provider, useSelector } from "react-redux";
import { store } from "./store";
import { RootModal } from "@/components/modals/root-modal";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <RootModal />
      {children}
    </Provider>
  );
}
