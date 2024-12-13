/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, ReactNode, useContext, useState } from 'react';
import { lighten, desaturate } from 'polished';

interface IGlobalProviderProps {
  children: ReactNode;
}

export interface ITheme {
  defaultColor: string;
  secondaryColor: string;
  primaryColor: string;
}

interface IGlobalContext {
  theme: ITheme;
  lightenColor: (color: string, factorValue: number) => string;
  darkenColor: (color: string, factorValue: number) => string;
}

const GlobalContext = createContext<IGlobalContext>({
  theme: {
    defaultColor: '',
    secondaryColor: '',
    primaryColor: '',
  },
  lightenColor: () => '',
  darkenColor: () => '',
});

export const GlobalProvider = ({ children }: IGlobalProviderProps) => {
  const [theme, setTheme] = useState<ITheme>({
    defaultColor: '#282e32',
    primaryColor: '#3b4248',
    secondaryColor: '#3686F8',
  });

  const lightenColor = (color: string, factorValue: number) => lighten(factorValue, color);
  const darkenColor = (color: string, factorValue: number) => desaturate(factorValue, color);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        lightenColor,
        darkenColor,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
