import React from 'react';
import styles from './Home.module.scss';
import EditorOutputComponent from '../../Components/Editor/EditorOutputComponent/EditorOutputComponent';


const Home: React.FC = () => {
    return (
        <div className={styles.container}>
<EditorOutputComponent/>
        </div>
    );
};

export default Home;