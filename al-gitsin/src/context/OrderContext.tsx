import { createContext, useContext, useState, type ReactNode } from "react";
import type { Product } from "../types/product";

interface OrderContextType {
  orders: Product[][];
  addOrder: (items: Product[]) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Product[][]>([]);

  const addOrder = (items: Product[]) => {
    setOrders(prev => [...prev, items]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used within OrderProvider");
  return context;
};
