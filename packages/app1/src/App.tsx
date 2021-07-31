import React, { Suspense, useState } from "react";
import { ErrorBoundary } from "./errorBoundary";
// const RemoteApp = React.lazy(() => import("app2/App"));
const Button = React.lazy(() => import("app2/button"));
const Grid = React.lazy(() => import("app2/grid"));

const App = () => {
  const [shown, setShown] = useState(true);
  const [shownGrid, setShownGrid] = useState(false);

  return (
    <div>
      <div style={{
        margin: "10px",
        padding: "10px",
        textAlign: "center",
        backgroundColor: "#ff912f",
        fontFamily: 'Verdana,sans-serif'
      }}>
        {!shown &&
          <button onClick={() => setShown(true)}>show app2 button</button>
        }
        {!shownGrid &&
          <button onClick={() => setShownGrid(true)}>show grid</button>
        }
        {shown &&
          <Suspense fallback={"loading..."}>
            <Button />
            {shownGrid &&
              <Grid />
            }
          </Suspense>
        }
        <h1>App1</h1>
      </div>
    </div>)
}


export default App;
