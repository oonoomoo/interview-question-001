import "./App.css";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { PUBLIC_ROUTER } from "@constants/page-router";
import { NotFound } from "@pages/not-found";
import { ENV } from "@constants/constants";
import config from "@configs";

function App() {
  useEffect(() => {
    if (config.env !== ENV.PRD) {
      return;
    }

    const originalLog = console.log;
    const originalInfo = console.info;
    const originalDebug = console.debug;
    const noConsole = () => undefined;

    console.log = noConsole;
    console.info = noConsole;
    console.debug = noConsole;

    return () => {
      console.log = originalLog;
      console.info = originalInfo;
      console.debug = originalDebug;
    };
  }, []);

  return (
    <>
      <Routes>
        {PUBLIC_ROUTER?.map((e) => (
          <Route key={e.code} path={e.path} element={e.component} />
        ))}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
