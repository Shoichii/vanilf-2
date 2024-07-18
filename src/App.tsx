import "./App.css"
import { PersonsCheckboxes } from "./components/PersonsCheckboxes"
import { FilterSelect } from "./components/FilterSelect"
import { useSelectsData } from "./app/hooks"

export const App: React.FC = () => {
  const [categoriesData] = useSelectsData()
  return (
    <div>
      <p className="title">Ждём Вас в удобное для Вас время!</p>
      <PersonsCheckboxes />
      <FilterSelect {...categoriesData} />
    </div>
  )
}
