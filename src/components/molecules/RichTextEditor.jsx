import React, { useState, useRef } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const RichTextEditor = ({ value, onChange, placeholder = "내용을 입력하세요..." }) => {
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  const editorRef = useRef();

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      onChange(content);
    }
  };

  const toggleHtmlMode = () => {
    if (isHtmlMode) {
      // Switch from HTML to visual
      editorRef.current.innerHTML = value;
    } else {
      // Switch from visual to HTML
      editorRef.current.textContent = value;
    }
    setIsHtmlMode(!isHtmlMode);
  };

  const toolbarButtons = [
    { command: "bold", icon: "Bold", title: "굵게" },
    { command: "italic", icon: "Italic", title: "기울임" },
    { command: "underline", icon: "Underline", title: "밑줄" },
    { command: "strikeThrough", icon: "Strikethrough", title: "취소선" },
    { command: "insertUnorderedList", icon: "List", title: "글머리 기호" },
    { command: "insertOrderedList", icon: "ListOrdered", title: "번호 매기기" },
    { command: "formatBlock", value: "h1", icon: "Heading1", title: "제목 1" },
    { command: "formatBlock", value: "h2", icon: "Heading2", title: "제목 2" },
    { command: "formatBlock", value: "h3", icon: "Heading3", title: "제목 3" },
    { command: "justifyLeft", icon: "AlignLeft", title: "왼쪽 정렬" },
    { command: "justifyCenter", icon: "AlignCenter", title: "가운데 정렬" },
    { command: "justifyRight", icon: "AlignRight", title: "오른쪽 정렬" },
  ];

  return (
    <div className="border-2 border-slate-200 rounded-xl overflow-hidden bg-white">
      <div className="editor-toolbar border-b bg-slate-50 flex items-center gap-2 p-3 flex-wrap">
        {toolbarButtons.map((btn, index) => (
          <button
            key={index}
            type="button"
            className="editor-button p-2 rounded-lg hover:bg-white transition-colors"
            onClick={() => execCommand(btn.command, btn.value)}
            title={btn.title}
          >
            <ApperIcon name={btn.icon} size={16} />
          </button>
        ))}
        
        <div className="w-px h-6 bg-slate-300 mx-2" />
        
        <Button
          type="button"
          variant={isHtmlMode ? "primary" : "secondary"}
          size="sm"
          onClick={toggleHtmlMode}
        >
          <ApperIcon name="Code" size={16} className="mr-1" />
          HTML
        </Button>
      </div>
      
      <div
        ref={editorRef}
        contentEditable
        className={`rich-editor min-h-[200px] p-4 outline-none ${isHtmlMode ? "font-mono text-sm" : ""}`}
        onInput={handleContentChange}
        dangerouslySetInnerHTML={{ __html: value }}
        style={{ whiteSpace: isHtmlMode ? "pre-wrap" : "normal" }}
        data-placeholder={placeholder}
      />
    </div>
  );
};

export default RichTextEditor;