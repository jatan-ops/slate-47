import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Editor } from "slate-react";
import { Value } from "slate";
import value from "./value.json";
import "./styles.css";

const initialValue1 = Value.fromJSON(value);
const initialValue2 = Value.fromJSON(value);

function App() {
  const [value1, setValue] = useState(initialValue1);
  const [value2, setValue2] = useState(initialValue2);
  const [activeEditor, setActiveEditor] = useState(1);

  const editor1 = useRef();
  const editor2 = useRef();

  const handleChange1 = ({ value }) => {
    setValue(value);
    setActiveEditor(1);
  };

  const handleChange2 = ({ value }) => {
    setValue2(value);
    setActiveEditor(2);
  };

  const toggleBold = event => {
    event.preventDefault();
    if (activeEditor === 1) {
      editor1.current.toggleMark("bold");
    } else {
      editor2.current.toggleMark("bold");
    }
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
      <Editor
        ref={editor2}
        className="Editor"
        value={value2}
        onChange={handleChange2}
        renderMark={renderMark}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
