import { MenuItem, TextField, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useHistory } from 'react-router-dom';

const QuizList = ({ getQuiz, getAllQuizzes }) => {

    const [id, setId] = useState();
    const [quizzes, setQuizzes] = useState();
    const [error, setError] = useState(false);

    const history = useHistory();

    const handleSubmit = () => {

        setError(false);
        getQuiz(id);
        history.push('/quiz');
    };

    const handleQuizCreate = () => {
        setError(false);
        history.push('/createquiz');
    }

    useEffect(() => {

        (async () => {
            const qzs = await getAllQuizzes();
            setQuizzes(qzs);
        })()
    }, []);

    return (
        <div className="content">
            <div className="settings">
                <span style={{ fontSize: 30 }}>Quiz Selection</span>

                <div className="settings_select">
                    {error && <ErrorMessage>Choose the quiz!</ErrorMessage>}

                    <TextField
                        select label="Select Quiz"
                        variant="outlined"
                        style={{ marginBottom: 30 }}
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    >
                        {
                            quizzes?.map((qz) => (
                                <MenuItem key={qz.id} value={qz.id}>
                                    {qz.title}
                                </MenuItem>
                            ))
                        }

                    </TextField>

                    <Button variant="contained" color="primary" size="large"
                        onClick={handleQuizCreate}
                    >
                        Create Quiz
                    </Button>

                    <Button variant="contained" color="primary" size="large"
                        onClick={handleSubmit}
                    >
                        Start Quiz
                    </Button>
                </div>
            </div>
            <img src='/quiz.svg' className="banner" alt="quiz img" />
        </div>
    );
};

export default QuizList;