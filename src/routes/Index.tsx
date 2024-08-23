import React, {useEffect, useState} from "react";
import Question from "../components/Question";
import Result from "../components/Result";

export interface API_DATA {
    difficulty: string;
    question: string;
    category: string;
    type: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export default function Index() {
    const [apiData, setApiData] = useState<API_DATA[] | false | 'loading'>('loading');
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [answers, setAnswers] = useState<string[]>([]);

    const nextQuestion = (answer: string) => {
        setAnswers(prev => [...prev, answer]);
        setCurrentQuestion(prev => prev + 1);
    };

    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=10&category=22')
            .then(response => {
                if (!response.ok) {
                    setApiData(false);
                }

                return response.json();
            }).then(data => {
            if (data.results !== undefined) {
                setApiData(data.results);
            } else {

                setApiData(false);
            }
        }).catch(() => setApiData(false));
    }, []);

    if (apiData === 'loading') {
        return <div>Загрузка</div>
    }
    if (!apiData || !Array.isArray(apiData) || apiData.length === 0) {
        return <div>Не удалось загрузить данные</div>
    }

    return (
        currentQuestion < apiData.length
            ? <Question
                difficulty={apiData[currentQuestion].difficulty}
                question={apiData[currentQuestion].question}
                category={apiData[currentQuestion].category}
                type={apiData[currentQuestion].type}
                correctAnswer={apiData[currentQuestion].correct_answer}
                incorrectAnswers={apiData[currentQuestion].incorrect_answers}
                nextQuestion={nextQuestion}
            />
            : <Result questions={apiData} answers={answers} />
    )
}
