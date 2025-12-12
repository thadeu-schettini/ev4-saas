import { createContext, useContext, useState, ReactNode } from "react";

interface InternalChatContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggle: () => void;
}

const InternalChatContext = createContext<InternalChatContextType | undefined>(undefined);

export function InternalChatProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  return (
    <InternalChatContext.Provider value={{ isOpen, setIsOpen, toggle }}>
      {children}
    </InternalChatContext.Provider>
  );
}

export function useInternalChat() {
  const context = useContext(InternalChatContext);
  if (context === undefined) {
    throw new Error("useInternalChat must be used within an InternalChatProvider");
  }
  return context;
}
