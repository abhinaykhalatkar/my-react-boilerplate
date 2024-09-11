import { useEffect, useState } from "react";
import EditorAuthenticator from "./EditorAuthenticator/EditorAuthenticator";
import Editor from "./Editor/Editor";
import { modalTypeEn } from "./EditorOutputComponent/EditorOutputComponent";
import { EditorContent } from "./Editor/Editor";


export default function EditorMain() {

  let [showEditorAuthenticator, setShowEditorAuthenticator] = useState(false);
  let [isEditorAccessGranted, setIsEditorAccessGranted] = useState(false);
  const [editorState, setEditorState] = useState<EditorContent>({
    editorContent: "",
    editorFoot: "",
    editorHead: "",
    editorOutputPosition: modalTypeEn.Normal,
    editorSubheading: "",
    isModuleActive: false,
  });

  function handleEditorStateChange(
    updatedFields: Partial<EditorContent>
  ) {
    setEditorState((prevState) => ({
      ...prevState,
      ...updatedFields,
    }));
  }
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.altKey && event.key === '#') {
      setShowEditorAuthenticator(!showEditorAuthenticator)
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showEditorAuthenticator]);

  return (
    <div>
      {(showEditorAuthenticator && !isEditorAccessGranted) 
      && <EditorAuthenticator setShowEditorAuthenticator={setShowEditorAuthenticator} 
      showEditorAuthenticator={showEditorAuthenticator}
      setIsEditorAccessGranted={setIsEditorAccessGranted} handleEditorStateChange={handleEditorStateChange}/>}
     
      {isEditorAccessGranted 
      && <Editor isEditorAccessGranted={isEditorAccessGranted} 
      setIsEditorAccessGranted={setIsEditorAccessGranted} setShowEditorAuthenticator={setShowEditorAuthenticator} editorState={editorState} handleEditorStateChange={handleEditorStateChange}/>}
    </div>
  );

}

//add current domain to the cors list in node back end
export const editorDomainAdd:string="https://node-editor.scribble-medienproduktion.de"

// export const editorDomainAdd:string="https://www.scribble-sandbox.de"// for tetsing on sandbox