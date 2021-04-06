import React, { useState, useEffect } from "react";
import { QuizCard } from "./QuizCard";
import Axios from "axios";

interface Props {}

export interface Question {
	id: number;
	question: string;
	description: string;
	answers: {
		answer_a: string;
		answer_b: string;
		answer_c: string;
		answer_d: string;
		answer_e: string;
		answer_f: string;
	};
	multiple_correct_answers: boolean;
	correct_answers: {
		answer_a_correct: string;
		answer_b_correct: string;
		answer_c_correct: string;
		answer_d_correct: string;
		answer_e_correct: string;
		answer_f_correct: string;
	};
	correct_answer: string;
	explanation: string;
	tip: string;
	tags: [
		{
			name: string;
		}
	];
	category: string;
	difficulty: string;
}

export const HomePage: React.FC<Props> = () => {
	const [quizList, setQuizList] = useState<Question[]>([]);
	const [check, setCheck] = useState<number[]>(Array(10).fill(0));
	const [flag, setFlag] = useState<string[]>(Array(10).fill(""));

	const reset = () => {
		Axios.get(
			"https://quizapi.io/api/v1/questions?apiKey=Pmz6HumstXBvUaz2qBwjrH3hN1ZxJWsfbEqv6OMy&difficulty=Easy&limit=10&tags=JavaScript"
		)
			.then((res) => {
				setQuizList(res.data);
				document.documentElement.scrollTop = 0;
				let state = Array(10).fill(0);
				setFlag(state);
				setCheck(state);
			})
			.catch((err) => console.log(err.response));
	};

	useEffect(() => {
		Axios.get(
			"https://quizapi.io/api/v1/questions?apiKey=Pmz6HumstXBvUaz2qBwjrH3hN1ZxJWsfbEqv6OMy&difficulty=Easy&limit=10&tags=JavaScript"
		)
			.then((res) => {
				setQuizList(res.data);
			})
			.catch((err) => console.log(err.response));
	}, []);

	const renderCards = () => {
		if (quizList && quizList.length > 0) {
			return quizList.map((item, index) => {
				return (
					<QuizCard
						key={index}
						index={index}
						quiz={item}
						check={check}
						setCheck={setCheck}
						flag={flag}
						setFlag={setFlag}
					/>
				);
			});
		}
	};

	return (
		<div className=" bg-light-blue">
			<div>
				<h1 className="text-center text-white font-semibold text-5xl py-16 text ">
					Quiz App
				</h1>
			</div>
			<div className="grid-flow-row grid max-w-screen-lg grid-cols-1 grid-rows-10 gap-8 md:gap-10 md:grid-cols-2 md:grid-rows-5 mx-10 lg:mx-auto lg:gap-12 pb-10">
				{renderCards()}
			</div>
			<h2 className="text-white text-center font-medium text-3xl mb-4 ">
				You have {check.filter((item) => item === 1).length} correct answers!
			</h2>
			<div className="text-center pb-12">
				<button
					onClick={reset}
					className="px-4 outline-none border-none py-2 rounded-sm bg-medium-blue text-white focus:border-yellow-50 "
				>
					Redo with different questions!
				</button>
			</div>
		</div>
	);
};
