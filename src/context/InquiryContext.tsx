import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface InquiryItem {
  productId: string;
  productName: string;
  grade: string;
  size: string;
  thickness: string;
  quantity: number;
  price: number;
}

interface InquiryContextType {
  items: InquiryItem[];
  addItem: (item: InquiryItem) => void;
  removeItem: (productId: string, grade: string, size: string, thickness: string) => void;
  updateQuantity: (productId: string, grade: string, size: string, thickness: string, quantity: number) => void;
  clearInquiry: () => void;
  totalItems: number;
  getWhatsAppMessage: () => string;
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

export const InquiryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<InquiryItem[]>(() => {
    const saved = localStorage.getItem('inquiry-cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('inquiry-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (item: InquiryItem) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        i => i.productId === item.productId && 
             i.grade === item.grade && 
             i.size === item.size && 
             i.thickness === item.thickness
      );
      
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
        return updated;
      }
      
      return [...prev, item];
    });
  };

  const removeItem = (productId: string, grade: string, size: string, thickness: string) => {
    setItems(prev => prev.filter(
      i => !(i.productId === productId && i.grade === grade && i.size === size && i.thickness === thickness)
    ));
  };

  const updateQuantity = (productId: string, grade: string, size: string, thickness: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, grade, size, thickness);
      return;
    }
    
    setItems(prev => prev.map(i => 
      i.productId === productId && i.grade === grade && i.size === size && i.thickness === thickness
        ? { ...i, quantity }
        : i
    ));
  };

  const clearInquiry = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const getWhatsAppMessage = () => {
    let message = "Hello AARTI ENTERPRISE,\n\nI would like to inquire about the following products:\n\n";
    
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.productName}\n`;
      message += `   Grade: ${item.grade}\n`;
      message += `   Size: ${item.size}\n`;
      message += `   Thickness: ${item.thickness}\n`;
      message += `   Quantity: ${item.quantity} pcs\n`;
      message += `   Approx Price: ₹${item.price.toLocaleString('en-IN')}/pc\n\n`;
    });
    
    message += "Please provide the best quotation.\n\nThank you!";
    
    return encodeURIComponent(message);
  };

  return (
    <InquiryContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearInquiry,
      totalItems,
      getWhatsAppMessage
    }}>
      {children}
    </InquiryContext.Provider>
  );
};

export const useInquiry = () => {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error('useInquiry must be used within an InquiryProvider');
  }
  return context;
};
