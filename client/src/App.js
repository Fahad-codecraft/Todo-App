import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import HomePage from "./scenes/homepage";
import LoginPage from "./scenes/loginPage";
import TodoPage from "./scenes/todosPage";
import Missing from "./scenes/Missing/Missing";
import { useSelector } from "react-redux"
import { useMemo } from "react";
import { createTheme } from "@mui/material";
import { CssBaseline, ThemeProvider } from "@mui/material"
import { themeSettings } from "./theme";
import { TodoProvider } from "./context/TodoContext";



function App() {
  const theme = useMemo(() => createTheme(themeSettings()), [])
  const isAuth = Boolean(useSelector((state) => state.token))
  return (

    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <TodoProvider>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/home"
                element={isAuth ? <HomePage /> : <Navigate to="/" />}
              />
              <Route path="/Todos"
                element={isAuth ? <TodoPage /> : <Navigate to="/" />}
              />
              <Route path="*" element={<Missing />} />
            </Routes>
          </TodoProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
