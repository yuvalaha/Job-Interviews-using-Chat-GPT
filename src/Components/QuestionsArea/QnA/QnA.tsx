import { useForm } from "react-hook-form";
import { QnaModel } from "../../../Models/QnaModel";
import { chatGptService } from "../../../Services/ChatGptService";
import { useState } from "react";
import { promptService } from "../../../Services/PromptService";
import "./QnA.css";

export function QnA(): JSX.Element {
    const { register, handleSubmit } = useForm<QnaModel>();
    const [completion, setCompletion] = useState<string>();

    async function send(qna: QnaModel) {
        try {
            const prompt = promptService.getPrompt(qna);
            const completion = await chatGptService.chat(prompt);
            setCompletion(completion);
        } catch (err: any) {
            alert(err.message);
        }
    }

    return (
        <div className="QnA">
            <form onSubmit={handleSubmit(send)}>
                <label htmlFor="technology">Select Programming Technology:</label>
                <select id="technology" defaultValue="" {...register("technology")} required>
                    <option value="" disabled>Select technology</option>
                    <option>HTML</option>
                    <option>CSS</option>
                    <option>JavaScript</option>
                    <option>Bootstrap</option>
                    <option>Python</option>
                    <option>React</option>
                    <option>Django</option>
                    <option>Flask</option>
                    <option>Docker</option>
                    <option>SQL</option>
                </select>

                <label htmlFor="level">Select Level:</label>
                <select id="level" defaultValue="" {...register("level")} required>
                    <option value="" disabled>Select level</option>
                    <option>Beginners</option>
                    <option>Intermediate</option>
                    <option>Expert</option>
                </select>

                <label htmlFor="count">Enter Number of Questions:</label>
                <input id="count" type="number" {...register("count")} required min="1" max="20" />

                <button type="submit">Get Questions</button>
            </form>

            {completion && (
                <div className="completion" dangerouslySetInnerHTML={{ __html: completion }} />
            )}
        </div>
    );
}
