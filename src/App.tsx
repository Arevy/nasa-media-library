import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/Search/SearchPage";
import DetailPage from "./pages/Detail/DetailPage";
import { StoreContext } from "./stores/StoreContext";
import "./App.scss";
import LoaderComponent from "./components/LoaderComponent/LoaderComponent";

function App() {
  const rootStore = useContext(StoreContext);
  return (
    <StoreContext.Provider value={rootStore}>
      {/* <LoaderComponent store={rootStore.nasaStore} /> */}
      <Router>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/details/:id" element={<DetailPage />} />
        </Routes>
      </Router>
    </StoreContext.Provider>
  );
}

export default App;
