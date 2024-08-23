import React, {useEffect, useMemo, useState} from "react";

interface QuestionProps {
    difficulty: string;
    question: string;
    category: string;
    type: string;
    correctAnswer: string;
    incorrectAnswers: string[];
    nextQuestion: (answer: string) => void;
}

export default function Question({
                                     difficulty,
                                     question,
                                     category,
                                     type,
                                     correctAnswer,
                                     incorrectAnswers,
                                     nextQuestion
                                 }: QuestionProps) {
    const [warning, setWarning] = useState<boolean>(false);

    const shuffledAnswers = useMemo(() => {
        const array = [...incorrectAnswers, correctAnswer];
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }, [incorrectAnswers, correctAnswer]);

    const submitHandler = (e: any): void => {
        e.preventDefault();

        const formData = new FormData(e.target);
        formData.set('question', question);
        formData.set('category', category);

        if (!formData.has('answer[]')) {
            setWarning(true);

            return;
        }

        //Простое сохрание ответа пользователя
        fetch('/', {
            method: 'POST',
            body: formData
        }).then(() => nextQuestion(String(formData.get('answer'))));
    };

    useEffect(() => {
        if (warning) {
            setTimeout(() => setWarning(false), 200);
        }
    }, [warning]);

    return (
        <div className={"question"}>
            <h2 className={"title question__difficulty _" + difficulty} data-dif={difficulty}>{question}</h2>
            <h3 className={"sub-title"}>{category}</h3>
            <form className="question__body" onSubmit={submitHandler}>
                {
                    shuffledAnswers.map(each => {
                        return (
                            <label className={"question__body__label"} key={each}>
                                <input
                                    type={type === 'multiple' ? 'checkbox' : 'radio'}
                                    className={"question__body__input"}
                                    name={"answer[]"}
                                    value={each}
                                />
                                {each}
                            </label>
                        )
                    })
                }
                <button
                    className={"question__body__label " + (warning ? "_shake" : "")}
                    type={'submit'}
                    disabled={warning}
                >
                    Подтвердить
                </button>
            </form>
        </div>
    )
}
