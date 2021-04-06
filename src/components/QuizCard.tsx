import React from "react";
import { Question } from "./HomePage";

interface Props {
	key: number;
	index: number;
	quiz: Question;
	check: number[];
	setCheck: React.Dispatch<React.SetStateAction<number[]>>;
	flag: string[];
	setFlag: React.Dispatch<React.SetStateAction<string[]>>;
}

export const QuizCard: React.FC<Props> = ({
	quiz,
	index,
	check,
	setCheck,
	flag,
	setFlag,
}) => {
	const handleChange = (e: any) => {
		const { correct_answers } = quiz;
		setFlag(e.target.value);
		let correct = "";
		if (correct_answers.answer_a_correct === "true") {
			correct = "a";
		}
		if (correct_answers.answer_b_correct === "true") {
			correct = "b";
		}
		if (correct_answers.answer_c_correct === "true") {
			correct = "c";
		}
		if (correct_answers.answer_d_correct === "true") {
			correct = "d";
		}
		if (correct_answers.answer_e_correct === "true") {
			correct = "e";
		}
		if (correct_answers.answer_f_correct === "true") {
			correct = "f";
		}
		let letter = e.target.value[e.target.value.length - 1];
		const checkArr = [...check];
		const flagArr = [...flag];
		flagArr.splice(index, 1, e.target.value);
		setFlag(flagArr);
		let value = letter === correct ? 1 : -1;
		checkArr.splice(index, 1, value);
		setCheck(checkArr);
	};

	const renderAnswers = () => {
		const { answers } = quiz;
		return Object.entries(answers).map(([key, value]) => {
			if (value) {
				return (
					<div key={key} className="space-x-2">
						<input
							onChange={handleChange}
							type="radio"
							name={`question_${index}`}
							id={`question_${index}_${value}`}
							value={key}
							checked={key === flag[index]}
						/>
						<label htmlFor={`question_${index}_${value}`}>{value}</label>
					</div>
				);
			} else {
				return null;
			}
		});
	};

	return (
		<div className=" bg-white  shadow-lg rounded-md px-6 py-4 space-y-1 ">
			<h3 className="font-bold leading-snug mb-1">
				<span>{index + 1}. </span>
				{quiz.question}
			</h3>
			{renderAnswers()}
			{check[index] > 0 ? (
				<div className="text-green-500">right answer</div>
			) : check[index] < 0 ? (
				<div className="text-red-500">wrong answer</div>
			) : null}
		</div>
	);
};
