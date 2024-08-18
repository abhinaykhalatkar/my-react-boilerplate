"use client";
import styles from "./EditorOutputComponent.module.scss";
import { EditorContent } from "../Editor/Editor";
import { useState, useEffect } from "react";
import DOMPurify from 'dompurify';

export enum modalTypeEn {
  Normal = "Normal",
  Center = "Center",
  Left = "Left",
  Right = "Right",
  Bottom = "Bottom",
  Top = "Top"
}

export default function EditorOutputComponent() {
  const [editorState, setEditorState] = useState<EditorContent>({
    editorContent: "",
    editorFoot: "",
    editorHead: "",
    editorOutputPosition: modalTypeEn.Normal,
    editorSubheading: "",
    isModuleActive: false,
  });

  const [isRetracted, setIsRetracted] = useState(false);

  useEffect(() => {
    async function fetchContent() {
      try {
        const response = await fetch('https://www.scribble-sandbox.de/fetch-editor-content', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch editor content');
        }

        const data = await response.json();
        setEditorState({
          editorHead: data.editorHead,
          editorContent: DOMPurify.sanitize(data.editorContent),
          editorFoot: data.editorFoot,
          editorOutputPosition: data.editorOutputPosition || modalTypeEn.Normal,
          editorSubheading: data.editorSubheading,
          isModuleActive: data.isModuleActive || false,
        });
      } catch (error) {
        console.error('Error fetching editor content:', error);
      }
    }

    fetchContent();
  }, []);

  const handleToggleRetract = () => {
    setIsRetracted(!isRetracted);
  };

  return (
    <>
      {editorState.isModuleActive && (
        <>
          {editorState.editorOutputPosition === modalTypeEn.Normal ? (
            <article className={`${styles.EditorCard} ${styles.Normal}`}>
              {editorState.editorHead && (
                <header>
                  <h2>{editorState.editorHead}</h2>
                </header>
              )}

              {editorState.editorSubheading && (
                <h3>{editorState.editorSubheading}</h3>
              )}

              {editorState.editorContent && (
                <div
                  className={`${styles.content} ql-editor`}
                  dangerouslySetInnerHTML={{ __html: editorState.editorContent }}
                ></div>
              )}
              {editorState.editorFoot && (
                <footer>
                  <h3>{editorState.editorFoot}</h3>
                </footer>
              )}
            </article>
          ) : (
            <article
              className={`${styles.EditorCard} ${styles[editorState.editorOutputPosition]} ${isRetracted ? styles.retracted : ''}`}
            >
              {editorState.editorHead && (
                <header>
                  <h2>{editorState.editorHead}</h2>
                  <button className={styles.closeBtn} onClick={handleToggleRetract}>
                    {isRetracted ? '>' : 'X'}
                  </button>
                </header>
              )}

              {editorState.editorSubheading && (
                <h3>{editorState.editorSubheading}</h3>
              )}

              {editorState.editorContent && (
                <div
                  className={`${styles.content} ql-editor`}
                  dangerouslySetInnerHTML={{ __html: editorState.editorContent }}
                ></div>
              )}
              {editorState.editorFoot && (
                <footer>
                  <h3>{editorState.editorFoot}</h3>
                </footer>
              )}
            </article>
          )}
        </>
      )}
    </>
  );
}
