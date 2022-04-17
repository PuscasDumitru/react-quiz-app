import { Button } from "@material-ui/core";
import { useEffect } from "react";
import { useHistory } from "react-router";
import "./Result.css";

const Result = ({ name, score }) => {
    const history = useHistory();

    useEffect(() => {
        if (!name) {
            history.push("/");
        }
    }, [name, history]);

    const handleClick = () => {
        history.push("/quizlist");
    }

    return (
        <div className="result">
            <span className="title">Final Score : {score}</span>
            <Button
                variant="contained"
                color="secondary"
                size="large"
                style={{ alignSelf: "center", marginTop: 20 }}
                onClick={handleClick}
            >
                Go to quiz list
            </Button>
        </div>
    );
};

export default Result;
