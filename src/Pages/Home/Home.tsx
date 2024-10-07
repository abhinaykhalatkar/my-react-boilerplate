import React from 'react';
import styles from './Home.module.scss';
// import EditorOutputComponent from '../../Components/Editor/EditorOutputComponent/EditorOutputComponent';
// import Modal from '../../Components/Modal/Modal';
import { useState } from 'react';
import ComponentContainer from '../../Components/ComponentContainer/ComponentContainer';
// import Breadcrumbs from '../../Components/Breadcrumbs/Breadcrumbs';


const Home: React.FC = () => {
    // const [isModalOpen,setIsModalOpen]=useState(false)
    // function handleSetModalOpen(){
    //     setIsModalOpen(!isModalOpen)
    // }
    // useEffect(()=>{},[isModalOpen])
    return (
        <div className={styles.container}>
            <ComponentContainer heading='Home' containerClassName={`container ${styles.Home}`}>
                <>
                
                 </>
            </ComponentContainer>
            {/* <button onClick={handleSetModalOpen}><h1>open</h1></button> */}
            {/* <EditorOutputComponent /> */}
            {/* <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
            content={<><h1>Hello</h1></>}></Modal> */}
        </div>
    );
};

export default Home;