import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Question from '../../components/Question/Question';
import "./Quiz.css"

const Quiz = ({ name, score, questions, quiz, setScore, setQuestions, submitQuestion, user }) => {

    const [options, setOptions] = useState();
    const [currentQuestion, setCurrentQuestion] = useState(0);

    useEffect(() => {
      
        setOptions(questions &&
            handleShuffle([
                
                ...questions[currentQuestion]?.answers ?? []
            ])
        );

    }, [questions, currentQuestion]);

    
    const handleShuffle = (optionss) => {
        return optionss.sort(() => Math.random() - 0.5);
    };

    return (
        <div className='quiz'>
            <span className="subtitle">
                Welcome, {name}
            </span>

            {
                questions ? (
                    <>
                        <div className='quizInfo'>
                            <span>Score : {score}</span>
                        </div>

                        <Question
                            currentQuestion={currentQuestion}
                            setCurrentQuestion={setCurrentQuestion}
                            questions={questions}
                            options={options}
                            
                            score={score}
                            setScore={setScore}
                            setQuestions={setQuestions}
                            submitQuestion={submitQuestion}
                            user={user}
                            quiz={quiz}
                        />
                    </>
                ) : (<CircularProgress style={{ margin: 100 }}
                    color='inherit'
                    size={150}
                    thickness={1}
                />
                )}
        </div>
    );

};

export default Quiz;