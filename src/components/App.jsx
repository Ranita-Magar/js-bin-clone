import React, { useEffect } from "react";
import Editor from "./Editor";
import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

function App() {
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [javascript, setJavascript] = useLocalStorage("javascript", "");

  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
      <html>
      <body>${html}</body>
      <style>${css}</style>
      <script>${javascript}</script>
      </html>
    `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, javascript]);

  return (
    <>
      <div className="navbar">
        <img
          src="/jsbin-logo.png"
          width="30px"
          height="30px"
          className="px-2"
        />
      </div>

      <div className="pane ">
        <div className=" pane top-pane ">
          <Editor
            language="xml"
            displayName="HTML"
            value={html}
            onChange={setHtml}
          />
          <Editor
            language="css"
            displayName="CSS"
            value={css}
            onChange={setCss}
            width="25vw"
          />
          <Editor
            language="javascript"
            displayName="JavaScript"
            value={javascript}
            onChange={setJavascript}
            width="25vw"
          />
        </div>

        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          height="100%"
          width="40%"
        />
      </div>
    </>
  );
}

export default App;
