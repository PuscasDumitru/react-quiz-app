import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useFormik } from "formik";
import * as Yup from "yup";
import './CreateQuizQuestion.css';

const CreateQuizQuestion = ({
    currentQuestion,
    setCurrentQuestion,
    createQuiz
}) => {

    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState(false);
    const nrOfQuestions = 1;

    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            question: "",
            correctAnswer: "",
            firstAnswer: "",
            secondAnswer: "",
            thirdAnswer: "",
            fourthAnswer: ""
        },
        validationSchema: Yup.object({
            question: Yup.string()
                .max(50, "Must be 50 characters or less")
                .required("Required"),
            correctAnswer: Yup.string()
                .max(50, "Must be 25 characters or less")
                .required("Required"),
            firstAnswer: Yup.string()
                .max(50, "Must be 25 characters or less")
                .required("Required"),
            secondAnswer: Yup.string()
                .max(50, "Must be 25 characters or less")
                .required("Required"),
            thirdAnswer: Yup.string()
                .max(50, "Must be 25 characters or less")
                .required("Required"),
            fourthAnswer: Yup.string()
                .max(50, "Must be 25 characters or less")
                .required("Required"),
        })

    });

    const handleNext = () => {
        if (formik.isValid) {

            setQuestions(oldArray => [...oldArray, {
                question: formik.values.question,
                answers: [formik.values.firstAnswer, formik.values.secondAnswer, formik.values.thirdAnswer, formik.values.fourthAnswer],
                correct_answer: formik.values.correctAnswer
            }]);

            setCurrentQuestion(currentQuestion + 1);

            if (currentQuestion == nrOfQuestions) {
                
                setTimeout(100);
                createQuiz("title", questions);
                handleQuit();
                
            }
        }

        else
            setError("Fill all the fields");

    };

    const handleQuit = () => {
        setCurrentQuestion(0);
        history.push("/quizlist");
    };

    return (
        <div className='question'>
            <h1>Question {currentQuestion + 1}</h1>

            <div className='singleQuestion'>

                <div className='options'>
                    {error && <ErrorMessage>{error}</ErrorMessage>}

                    <form>
                        <div >
                            {formik.touched.question && formik.errors.question ? <p>{formik.errors.question}</p> : null}
                            <input

                                id="question"
                                name="question"
                                type="text"
                                placeholder="Your Question"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.question}
                            />

                            {formik.touched.correctAnswer && formik.errors.correctAnswer ? <p>{formik.errors.correctAnswer}</p> : null}
                            <input
                                id="correctAnswer"
                                name="correctAnswer"
                                type="text"
                                placeholder="Correct Answer"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.correctAnswer}
                            />

                            {formik.touched.firstAnswer && formik.errors.firstAnswer ? <p>{formik.errors.firstAnswer}</p> : null}
                            <input
                                id="firstAnswer"
                                name="firstAnswer"
                                type="text"
                                placeholder="First Options"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.firstAnswer}
                            />

                            {formik.touched.secondAnswer && formik.errors.secondAnswer ? <p>{formik.errors.secondAnswer}</p> : null}
                            <input
                                id="secondAnswer"
                                name="secondAnswer"
                                type="text"
                                placeholder="Second Option"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.secondAnswer}
                            />

                            {formik.touched.thirdAnswer && formik.errors.thirdAnswer ? <p>{formik.errors.thirdAnswer}</p> : null}
                            <input
                                id="thirdAnswer"
                                name="thirdAnswer"
                                type="text"
                                placeholder="Third Option"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.thirdAnswer}
                            />

                            {formik.touched.fourthAnswer && formik.errors.fourthAnswer ? <p>{formik.errors.fourthAnswer}</p> : null}
                            <input
                                id="fourthAnswer"
                                name="fourthAnswer"
                                type="text"
                                placeholder="Fourth Option"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.fourthAnswer}
                            />
                        </div>

                    </form>
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
                        {currentQuestion == nrOfQuestions ? "Submit" : "Next Question"}
                    </Button>

                </div>
            </div>
        </div>
    );
};

export default CreateQuizQuestion