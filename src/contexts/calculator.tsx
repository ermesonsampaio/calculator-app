import { createContext, useState } from 'react';

export interface CalculatorContextData {
  currentResult?: number | null;
  currentExpression?: string | null;
}

const CalculatorContext = createContext<CalculatorContextData>({} as CalculatorContextData);

export function CalculatorProvider({ children }: { children: React.ReactNode }) {
  const [currentResult, setCurrentResult] = useState(null);
  const [currentExpression, setCurrentExpression] = useState(null);

  return (
    <CalculatorContext.Provider value={{ currentExpression, currentResult }}>
      {children}
    </CalculatorContext.Provider>
  )
}