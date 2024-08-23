import React from "react";
import {API_DATA} from "../routes/Index";

export default function Result({questions, answers}: { questions: API_DATA[], answers: string[] }) {
    const sortedList : API_DATA[] = questions.sort((a: API_DATA, b: API_DATA) => {
        const left = a.difficulty === 'easy' ? 1 : a.difficulty === 'medium' ? 2 : 3;
        const right = a.difficulty === 'easy' ? 1 : a.difficulty === 'medium' ? 2 : 3;

        if(left > right) {
            return 1;
        } else if (left < right) {
            return -1;
        }

        return 0;
    });

    return (
        <div className={"results"}>
            <h2 className={"title"}>Ваши результаты:</h2>
            <div className="results__body">
                <div className="results__body__block _prompts">
                    <div>Вопрос</div>
                    <div>Правильный ответ</div>
                    <div>Ваш ответ</div>
                </div>
                {
                    sortedList.map((each, i)=>{
                        return (
                            <div className={"results__body__block"} key={each.question}>
                                <div className={"results__body__block__question"}>{each.question}</div>
                                <div className={"results__body__block__answer"}>{answers[i]}</div>
                                <div className={"results__body__block__correct-answer"}>{each.correct_answer}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
