import { TextField, Button } from '@material-ui/core';
import React, { useState } from 'react';
import './Home.css';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useHistory } from 'react-router-dom';

const Home = ({ name, setName, surname, setSurname, createUser }) => {

    const [error, setError] = useState(false);

    const history = useHistory();

    const handleSubmit = () => {
        if (!name || !surname) {
            setError(true);
            return;
        }
        else {
            setError(false);
            createUser(name, surname);
            history.push('/quizlist');
        }
    };

    return (
        <div className="content">
            <div className="settings">
                <span style={{ fontSize: 30 }}>Welcome, fill the fields to start solving!</span>


                <div className="settings_select">
                    {error && <ErrorMessage>Fill all the fields!</ErrorMessage>}

                    <TextField
                        style={{ marginBottom: 25 }}
                        label='Enter Your Name'
                        variant="outlined"
                        onChange={(e) => setName(e.target.value)} />

                    <TextField
                        style={{ marginBottom: 25 }}
                        label='Enter Your Surname'
                        variant="outlined"
                        onChange={(e) => setSurname(e.target.value)} />

                    <Button variant="contained" color="primary" size="large"
                        onClick={handleSubmit}
                    >
                        Continue
                    </Button>
                </div>
            </div>
            <img src='/quiz.svg' className="banner" alt="quiz img" />
        </div>
    );
};

export default Home;