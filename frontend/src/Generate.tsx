import {useState} from 'react'
import "./Generate.css"

function GenerateQuiz(){

    const [subject, setSubject] = useState('')
    const [topics, setTopics] = useState('')
    const [num, setNum] = useState(0)
    const [quiz, setQuiz] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const payload = {
            subject,
            topics,
            num,
        }

        try {
            const res = await fetch("http://localhost:8080/api/quiz/gen", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })

            if (!res.ok) {
                throw new Error("Failed to fetch quiz")
            }

            const data = await res.json()

            setQuiz(JSON.stringify(data, null, 2))
        } catch (err) {
            console.error(err)
            setQuiz("Error fetching quiz")
        }
    }
    return (
        <>
            <div className="quiz-form-div">
                <form className="quiz-form" onSubmit={handleSubmit}>
                    <h2>Subject: </h2>
                    <input 
                        placeholder="Subject" 
                        className="quiz-input"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                    <h2>Topics: </h2>
                    <input
                        placeholder="Topics (Comma Separated List)" 
                        className="quiz-input"
                        value={topics}
                        onChange={(e) => setTopics(e.target.value)}
                    />
                    <h2>Questions: </h2>
                    <input
                        type='number'
                        className='quiz-input'
                        min="1"
                        max="20"
                        value={num}
                        onChange={(e) => setNum(e.target.valueAsNumber)}
                    />
                    <button className="gen-button">Generate Quiz</button>
                </form>
                <pre style={{ whiteSpace: "pre-wrap", marginTop: "1em" }}>
                    {quiz}
                </pre>
            </div>
        </>
    )
}

export default GenerateQuiz