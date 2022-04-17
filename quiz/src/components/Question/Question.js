import { Button } from '@material-ui/core';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './Question.css';

const Question = ({
    currentQuestion,
    setCurrentQuestion,
    questions,
    options,
   
    setScore,
    score,
    setQuestions,
    submitQuestion,
    user,
    quiz
}) => {

    const [selected, setSelected] = useState();
    const [error, setError] = useState(false);
    const [correct, setCorrect] = useState();

    const history = useHistory();

    const handleSelect = (i) => {

        if (selected === i && selected === correct) {
            return 'select';
        }
        else if (selected === i && selected !== correct) {
            return 'wrong';
        }
        else if (i === correct) {
            return 'select';
        }
    };

    const handleCheck = (i) => {
        
        setSelected(i);

        (async () => {
            const resp = await submitQuestion(quiz.id, questions[currentQuestion].id, user.id, i);
            setCorrect(resp);
            
        })()

        if (i === correct)
            setScore(score + 1);

        setError(false);
    };


    const handleNext = () => {
        if (currentQuestion == 1) {
            history.push("/result");
        } else if (selected) {
            setCurrentQuestion(currentQuestion + 1);
            setSelected();
        } else setError("Please select an option first");
    };

    const handleQuit = () => {
        setCurrentQuestion(0);
        setQuestions();
        history.push("/");
    };

    return (
        <div className='question'>
            <h1>Question {currentQuestion + 1}</h1>

            <div className='singleQuestion'>
                <h2>{questions[currentQuestion].question}</h2>

                <div className='options'>
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    {
                        options &&
                        options.map((i) => (
                            <button
                                className={`singleOption  ${selected && handleSelect(i)}`}
                                key={i}
                                onClick={() => handleCheck(i)}
                                disabled={selected}
                            >
                                {i}
                            </button>
                        ))
                    }
                </div>

                <div className='controls'>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        style={{ width: 185 }}
                        onClick={() => handleQuit()}
                    >
                        Quit
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        style={{ width: 185 }}
                        onClick={handleNext}
                    >
                        {currentQuestion == 1 ? "Submit" : "Next Question"}
                    </Button>

                </div>
            </div>
        </div>
    );
};

export default Question