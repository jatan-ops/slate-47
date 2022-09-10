import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Editor } from "slate-react";
import { Value } from "slate";
import value from "./value.json";
import "./styles.css";

const initialValue1 = Value.fromJSON(value);

function App() {
  const [value1, setValue] = useState(initialValue1);

  const editor1 = useRef();

  const handleChange1 = ({ value }) => {
    setValue(value);    
  };

  const toggleBold = event => {
    event.preventDefault();
    editor1.current.toggleMark("bold");
  };

  const renderMark = (props, editor, next) => {
    const { children, mark, attributes } = props;
    switch (mark.type) {
      case "bold":
        return <strong {...attributes}>{children}</strong>;
      case "italic":
        return <em {...attributes}>{children}</em>;
      case "underline":
        return <u {...attributes}>{children}</u>;
      default:
        return next();
    }
  };

  return (
    <div className="App">
      <h1>Slate Editor</h1>
      <button onMouseDown={toggleBold}>Bold</button>
      <Editor
        ref={editor1}
        className="Editor"
        value={value1}
        onChange={handleChange1}
        renderMark={renderMark}
      />    
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
