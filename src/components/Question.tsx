import React, {useEffect, useState} from "react";

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

    const submitHandler = (e: any): void => {
        e.preventDefault();

        const formData = new FormData(e.target);
        formData.set('question', question);
        formData.set('category', category);

        if (!formData.has('answer')) {
            return;
        }

        //Простое сохрание ответа пользователя
        fetch('/', {
            method: 'POST',
            body: formData
        }).then(() => nextQuestion(String(formData.get('answer'))));
    };
    const shuffle = (array: any[]): any[] => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    };

    useEffect(()=>{

        setTimeout(()=> setWarning(false), 200);

    }, [warning]);

    return (
        <div className={"question"}>
            <div className={"question__header"}>
                <div className={"question__header__difficulty"}>{difficulty}</div>
                <h2 className="title">{question}</h2>
            </div>
            <h3 className={"sub-title"}>{category}</h3>
            <form className="question__body" onSubmit={submitHandler}>
                {
                    shuffle([...incorrectAnswers, correctAnswer]).map(each => {
                        return <input
                            type={type === 'multiple' ? 'checkbox' : 'radio'}
                            className={"question__body__input"}
                            name={"answer"}
                            value={each}
                            key={each}
                            required={true}
                        />
                    })
                }
                <button className={"question__body__submit" + warning ? "_shake" : ""} type={'submit'} disabled={warning}>
                    Подтвердить
                </button>
            </form>
        </div>
    )
}
