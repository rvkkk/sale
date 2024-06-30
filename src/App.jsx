import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import React, { Suspense } from "react";
import Loader from "./components/Loader";
import { AuthProvider } from "./components/Contexts/AuthContext";
import { CartProvider } from "./components/Contexts/CartContext";

function App() {
  console.log(process.env.NODE_ENV);
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Suspense fallback={<Loader />}>
            <Routes>
              {Object.values(routes).map((route) => {
                const Component = route.component;
                return (
                  <Route
                    key={route.path}
                    element={<Component />}
                    path={route.path}
                  />
                );
              })}
            </Routes>
          </Suspense>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
