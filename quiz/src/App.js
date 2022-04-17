
import axios from 'axios';
import { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './Pages/Home/Home';
import Quiz from './Pages/Quiz/Quiz';
import QuizList from './Pages/QuizList/QuizList';
import Result from './Pages/Result/Result';
import CreateQuiz from './Pages/CreateQuiz/CreateQuiz';

function App() {

  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [quiz, setQuiz] = useState();
  const [questions, setQuestions] = useState();
  const [score, setScore] = useState(0);
  const [user, setUser] = useState();

  const getAccessToken = async () => {
    const token = await axios({
      method: 'post',
      url: 'https://pure-caverns-82881.herokuapp.com/api/developers/v72/tokens',
      headers: {
        'X-Developer-Key': 'c84de8bc57de892ea234403cd458dc7ec381ab5eae3f5db9b21d4e90f41eadd0',
        'X-Developer-Secret': 'e5743435e39657c42f6b05074f9046e8130a65baf44cd4784d6debc75674dc6b'
      }
    }).then(res => res.data.token);

    return token;
  }

  const createUser = async (name, surname) => {

    const accessToken = await getAccessToken();

    const usr = await axios({
      method: 'post',
      url: 'https://pure-caverns-82881.herokuapp.com/api/v54/users',
      headers: {
        'X-Access-Token': accessToken
      },
      data: {
        "data": {
          "name": name,
          "surname": surname
        }
      }
    }).then(res => res.data);

    setUser(usr);

  }

  const createQuiz = async (title, questions) => {

    console.log(questions);
    const accessToken = await getAccessToken();

    const quiz = await axios({
      method: 'post',
      url: 'https://pure-caverns-82881.herokuapp.com/api/v54/quizzes',
      headers: {
        'X-Access-Token': accessToken
      },
      data: {
        "data": {
          "title": "title" + Math.random(),
          "questions": questions
        }
      }
    }).then(res => res.data);

    console.log(quiz);

    return quiz;
  }

  const getQuiz = async (id) => {

    const accessToken = await getAccessToken();

    const qz = await axios({
      method: 'get',
      url: `https://pure-caverns-82881.herokuapp.com/api/v54/quizzes/${id}`,
      headers: {
        'X-Access-Token': accessToken
      }
    }).then(res => res.data);

    setQuestions(qz.questions)
    setQuiz(qz);
  };

  const getAllQuizzes = async () => {

    const accessToken = await getAccessToken();

    const quizzes = await axios({
      method: 'get',
      url: 'https://pure-caverns-82881.herokuapp.com/api/v54/quizzes',
      headers: {
        'X-Access-Token': accessToken
      }
    }).then(res => res.data);

    return quizzes;
  }

  const submitQuestion = async (quizId, questionId, userId, answer) => {

    const accessToken = await getAccessToken();

    const quiz = await axios({
      method: 'post',
      url: `https://pure-caverns-82881.herokuapp.com/api/v54/quizzes/${quizId}/submit`,
      headers: {
        'X-Access-Token': accessToken
      },
      data: {
        "data": {
          "question_id": questionId,
          "answer": answer,
          "user_id": userId
        }
      }
    }).then(res => res.data.correct_answer);

    return quiz;
  }

  const deleteQuiz = async () => {

    const accessToken = await getAccessToken();

    const quiz = await axios({
      method: 'delete',
      url: 'https://pure-caverns-82881.herokuapp.com/api/v54/quizzes/168',
      headers: {
        'X-Access-Token': accessToken
      }
    }).then(res => res.data);

    return quiz;
  }

  return (
    <BrowserRouter>
      <div className="app" style={{ backgroundImage: 'url(./ques1.png' }}>
        <Header />

        <Switch>
          <Route path='/' exact>
            <Home
              name={name}
              setName={setName}
              surname={surname}
              setSurname={setSurname}
              createUser={createUser}
            />
          </Route>

          <Route path='/quizlist' exact>
            <QuizList
              getQuiz={getQuiz}
              getAllQuizzes={getAllQuizzes}
            />
          </Route>

          <Route path='/createquiz' exact>
            <CreateQuiz
              createQuiz={createQuiz}
            />
          </Route>

          <Route path='/quiz' exact>
            <Quiz
              name={name}
              questions={questions}
              quiz={quiz}
              score={score}
              setScore={setScore}
              setQuestions={setQuestions}
              submitQuestion={submitQuestion}
              user={user}

            />
          </Route>

          <Route path='/result' exact>
            <Result
              name={name}
              score={score}
            />
          </Route>
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;