import { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import "./Generate.css"

function GenerateQuiz(){

    const [subject, setSubject] = useState('')
    const [topics, setTopics] = useState('')
    const [num, setNum] = useState(10)

    // const navigate = useNavigate()

    const valid = subject.trim() !== '' && topics.trim() !== ''

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

            // const data = await res.json() //Send this data to /quiz

        } catch (err) {
            console.error(err)
        }
    }
    return (
        <>
        <div className='main'>
            <div className="quiz-form-div">
                <form className="quiz-form" onSubmit={handleSubmit}>
                    <h1 className='quiz-gen-title'>Generate Quiz</h1>
                    <div className="input-div">
                        <label htmlFor="subject" className='input-label'>Subject </label>
                        <input 
                            placeholder="Differential Equations" 
                            id="subject"
                            className="quiz-input"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>
                    <div className='input-div'>
                        <label htmlFor="topics" className='input-label'>Topics </label>
                        <input
                            placeholder="Eigenvalues, Laplace Transform, First-Order ODEs" 
                            id="topics"
                            className="quiz-input"
                            value={topics}
                            onChange={(e) => setTopics(e.target.value)}
                        />
                    </div>
                    <div className='input-div'>
                    <label htmlFor="number" className='input-label'>Questions </label>
                        <input
                            type='number'
                            className='quiz-input-number'
                            id="number"
                            min="1"
                            max="20"
                            value={num}
                            onChange={(e) => setNum(e.target.valueAsNumber)}
                        />
                    </div>
                    <button className="gen-button" type="submit" disabled={!valid}>Generate Quiz</button>
                </form>
            </div>
        </div>
        </>
    )
}

export default GenerateQuiz