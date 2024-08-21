"use client";
import React, { useEffect, useRef } from "react";
import Quill from 'quill';
import 'quill/dist/quill.snow.css'; // Import Quill styles
import styles from "./Editor.module.scss";
import BackDrop from "../../Backdrop/BackDrop";
import AlertModule from "../../AlertModule/AlertModule";
import { modalTypeEn } from "../EditorOutputComponent/EditorOutputComponent";
import { editorDomainAdd } from "../EditorMain";

interface EditorAuthenticatorProps {
  isEditorAccessGranted: boolean;
  setIsEditorAccessGranted: (value: boolean) => void;
  setShowEditorAuthenticator: (value: boolean) => void;
  editorState:EditorContent;
  handleEditorStateChange: (updatedFields: Partial<EditorContent>) => void;
}
export type EditorContent = {
  editorContent: string;
  editorFoot: string;
  editorHead: string;
  editorOutputPosition: modalTypeEn;
  editorSubheading: string;
  isModuleActive: boolean;
};

const Editor: React.FC<EditorAuthenticatorProps> = ({ isEditorAccessGranted, setIsEditorAccessGranted ,editorState,handleEditorStateChange,setShowEditorAuthenticator}) => {
  const editorRef = useRef<HTMLDivElement>(null); 
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: '1' }, { header: '2' }, { header: '3' }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['clean'], // remove formatting button
          ],
        },
        placeholder: "Write your content here...",
      });

      if (editorState.editorContent) {
        quillRef.current.root.innerHTML = editorState.editorContent;
      }

      quillRef.current.on('text-change', () => {
        const content = quillRef.current!.root.innerHTML;
        handleEditorStateChange({ editorContent: content });
      });

      return () => {
        quillRef.current?.off('text-change');
      };
    }
  }, []);

  const handleSubmit = async () => {
    const additionalDataFormatted = JSON.stringify({
      editorHead: editorState.editorHead,
      editorContent: editorState.editorContent, 
      editorSubheading: editorState.editorSubheading,
      editorFoot: editorState.editorFoot,
      editorOutputPosition: editorState.editorOutputPosition,
      isModuleActive: editorState.isModuleActive
    });
  
  
    try {
      const token = localStorage.getItem('jwtToken'); // Assuming the JWT token is stored in localStorage
  
      const response = await fetch(`${editorDomainAdd}/save-editor-content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the JWT token in the Authorization header
        },
        body: additionalDataFormatted // Send the formatted data
      });
  
      if (!response.ok) {
        throw new Error('Failed to save editor content');
      }

  
      setIsEditorAccessGranted(false); 
      setShowEditorAuthenticator(false)
    } catch (error) {
      console.error('Error saving editor content:', error);
      // Handle the error (e.g., show a message to the user)
    }
  };
  

  return (
    <>
      <AlertModule alertContent="Editor Access granted for a session of 60 min" visibleTime={3} />
      <BackDrop showBackdrop={isEditorAccessGranted} setShowBackdrop={() => { }} >
      <div className={styles.editorModule}>
        <div className={styles.switchWrapper}>
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={editorState.isModuleActive}
              onChange={(e) => handleEditorStateChange({isModuleActive:(e.target.checked)})}
            />
            <span className={styles.slider}></span>
          </label>
          <span className={styles.switchLabel}>Module Active</span>
        </div>
        <div className={`${styles.d_flex} ${styles.formGroupOutDiv}`}>

          <div className={styles.formGroup}>
            <div className={styles.floatingLabelInput}>
              <input
                type="text"
                value={editorState.editorHead}
                onChange={(e) => handleEditorStateChange({editorHead:(e.target.value)})}
                className={styles.inputField}
                placeholder=" "
                required
              />
              <label className={editorState.editorHead ? styles.active : ""}>Headline</label>
            </div>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.floatingLabelInput}>
              <input
                type="text"
                value={editorState.editorSubheading}
                onChange={(e) => handleEditorStateChange({editorSubheading:(e.target.value)})}
                className={styles.inputField}
                placeholder=" "
                required
              />
              <label className={editorState.editorSubheading ? styles.active : ""}>Subheading</label>
            </div>
          </div>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.contentLabel}>Content</label>
          <div className={styles.editorWrapper}>
            <div ref={editorRef} className={styles.quillEditor} />
          </div>
        </div>
        <div className={`${styles.d_flex} ${styles.formGroupOutDiv}`}>
          <div className={styles.formGroup}>
            <div className={styles.floatingLabelInput}>
              <input
                type="text"
                value={editorState.editorFoot}
                onChange={(e) => handleEditorStateChange({editorFoot:(e.target.value)})}
                className={styles.inputField}
                placeholder=" "
                required
              />
              <label className={editorState.editorFoot ? styles.active : ""}>Footnote</label>
            </div>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.floatingLabelInput}>
              <select
                id="editorOutputPosition"
                value={editorState.editorOutputPosition}
                onChange={(e) => handleEditorStateChange({editorOutputPosition:(e.target.value as modalTypeEn)})}
                className={styles.selectField}
              >
                {Object.values(modalTypeEn).map((position) => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </select>
              <label htmlFor="editorOutputPosition" className={styles.bottomRightLabel}>
                Output Position
              </label>
            </div>
          </div>
        </div>
        <div className={styles.btnBlock}>
          <button className={styles.submit} onClick={handleSubmit}>
            Save
          </button>
          <button
            onClick={() => {
              setIsEditorAccessGranted(false);
            }}
            className={styles.cancel}
          >
            Cancel
          </button>
        </div>
      </div>
      </BackDrop >
    </>
  );
};

export default Editor;
