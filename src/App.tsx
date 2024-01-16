
import './App.scss';
import SearchComponent from './pages/Search/SearchPage';
import { RootStore } from './stores/RootStore';
import { StoreContext } from './stores/StoreContext';

function App() {
  return (
    <StoreContext.Provider value={new RootStore()}>
      <SearchComponent />
    </StoreContext.Provider>);
}

export default App;
