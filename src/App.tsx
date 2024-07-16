import "./App.css"
import { PersonsCheckboxes } from "./components/PersonsCheckboxes"

export const App: React.FC = () => {

  return (
    <div>
      <p className="title">Ждём Вас в удобное для Вас время!</p>
      <PersonsCheckboxes />
    </div>
  )
}
