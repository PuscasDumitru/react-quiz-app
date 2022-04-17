import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import CreateQuizQuestion from '../../components/CreateQuizQuestion/CreateQuizQuestion';
//import "./Quiz.css"

const CreateQuiz = ({ createQuiz }) => {

    const [options, setOptions] = useState();
    const [currentQuestion, setCurrentQuestion] = useState(0);

    return (
        <div className='quiz'>
            <span className="subtitle">
                Create Your Quiz
            </span>

            {
                true ? (
                    <>
                        <div className='quizInfo'>
                            <span>Creating Quiz</span>
                        </div>

                        <CreateQuizQuestion
                            currentQuestion={currentQuestion}
                            setCurrentQuestion={setCurrentQuestion}
                            createQuiz={createQuiz}
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

export default CreateQuiz;