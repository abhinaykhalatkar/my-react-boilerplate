"use client";
import { useEffect, useState ,useRef} from "react";
import styles from "./EditorAuthenticator.module.scss";
import BackDrop from "../../Backdrop/BackDrop";
import { EditorContent } from "../Editor/Editor";
import { editorDomainAdd } from "../EditorMain";

interface EditorAuthenticatorProps {
  setIsEditorAccessGranted: (value: boolean) => void;
  showEditorAuthenticator: boolean;
  setShowEditorAuthenticator: (value: boolean) => void;
  handleEditorStateChange: (updatedFields: Partial<EditorContent>) => void;
  
}
 const EditorAuthenticator: React.FC<EditorAuthenticatorProps> =({showEditorAuthenticator, setIsEditorAccessGranted,setShowEditorAuthenticator ,handleEditorStateChange}) => {

  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [grantedWarning, setGrantedWarning] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // Set focus on the input field when the component mounts
    }
  }, []);

  const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents page reload
    try {
        const response = await fetch(`${editorDomainAdd}/verify-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }), // Sending password as JSON
        });

        const data = await response.json(); // Parsing JSON response

        if (response.ok) {
          setResponseMessage('Access Granted!');
          setGrantedWarning(true); // Handle successful response
  
          // Store the JWT token
          if (data.token) {
            localStorage.setItem('jwtToken', data.token);
          }
          if (data.token) {
            handleEditorStateChange(JSON.parse(data.additionalData))
          }
          setIsEditorAccessGranted(true)
        } else {
          setResponseMessage('Access Denied: ' + (data.error || 'Invalid Password'));
        }
    } catch (error) {
        setResponseMessage('Error: Unable to connect to the server.');
    }
};
useEffect(()=>{},[grantedWarning])
  return (
    <>
      <BackDrop showBackdrop={showEditorAuthenticator} setShowBackdrop={setShowEditorAuthenticator}/>
      <form className={styles.authForm} onSubmit={handleSubmit}>
        <h2>Enter Editor Password</h2>
        <label htmlFor="inp" className={styles.inp}>
          <input ref={inputRef}  type="password" value={password} id="inp" onChange={(e) => setPassword(e.target.value)} placeholder="Password" pattern=".{8,}" required />
          <svg width="280px" height="18px" viewBox="0 0 280 18" className={styles.border}>
            <path d="M0,12 L223.166144,12 C217.241379,12 217.899687,12 225.141066,12 C236.003135,12 241.9279,12 249.827586,12 C257.727273,12 264.639498,12 274.514107,12 C281.097179,12 281.755486,12 276.489028,12"></path>
          </svg>
          <svg width="14px" height="12px" viewBox="0 0 14 12" className={styles.check}>
            <path d="M1 7 5.5 11 L13 1"></path>
          </svg>
        </label>
        {responseMessage && <p className={grantedWarning?styles.successWarning:styles.failWarning}>{responseMessage}</p>}
        <div className={styles.btnBlock} >
        <input className={styles.submit}  type="submit" value="Submit" />
        <button onClick={()=>{setShowEditorAuthenticator(false)}} className={styles.cancel}> Cancel</button>
        </div>
      </form>
    </>

  );
}

export default EditorAuthenticator;
