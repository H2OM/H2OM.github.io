import React from "react";
import {API_DATA} from "../routes/Index";

export default function Result({questions, answers}: { questions: API_DATA[], answers: string[] }) {
    const sortedList: API_DATA[] = questions.sort((a: API_DATA, b: API_DATA) => {
        const left = a.difficulty === 'easy' ? 1 : a.difficulty === 'medium' ? 2 : 3;
        const right = b.difficulty === 'easy' ? 1 : b.difficulty === 'medium' ? 2 : 3;

        if (left > right) {
            return 1;
        } else if (left < right) {
            return -1;
        }

        return 0;
    });

    const compareArray = (first: any[], second: any[]): 'none' | 'min' | 'max' => {
        if (first.length !== second.length) {
            return 'none';
        }

        let correct: number = 0;

        const totalCorrect = first.every((value, index): boolean => {
            if (value === second[index]) {
                correct++;
            }

            return value === second[index];
        });

        if (correct === 0 && !totalCorrect) {
            return 'none';
        } else if (correct > 0 && !totalCorrect) {
            return 'min';
        } else {
            return 'max';
        }
    }

    return (
        <div className={"results"}>
            <h2 className={"title"}>Ваши результаты:</h2>
            <div className="results__body body">
                <div className="results__body__block _prompts">
                    <div>Вопрос</div>
                    <div>Правильный ответ</div>
                    <div>Ваш ответ</div>
                    <div>Сложность</div>
                </div>
                {
                    sortedList.map((each, i) => {
                        const correction : 'none' | 'min' | 'max' = compareArray(
                            each.correct_answer.split(', ').sort(),
                            answers[i].split(', ').sort()
                        );

                        return (
                            <div className={"results__body__block _" + correction} key={each.question}>
                                <div className={"results__body__block__question"}>{each.question}</div>
                                <div className={"results__body__block__correct-answer"}>{each.correct_answer}</div>
                                <div className={"results__body__block__answer"}>{answers[i]}</div>
                                <div className={"results__body__block__dif _" + each.difficulty}>{each.difficulty}</div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
