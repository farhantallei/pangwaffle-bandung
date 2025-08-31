import { createContext, useContext, useState } from "react"

interface FilterContextProps {
  selectedCategory: string
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>
}

const FilterContext = createContext<FilterContextProps>(null!)

export function useFilterContext() {
  return useContext(FilterContext) || {}
}

interface FilterProviderProps extends React.PropsWithChildren { }

export default function FilterProvider({ children }: FilterProviderProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")

  return (
    <FilterContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </FilterContext.Provider>
  )
}
