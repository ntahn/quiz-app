import React, { useState, useEffect } from "react";
import { QuizCard } from "./QuizCard";
import Axios from "axios";
import { ToggleButton } from "./ToggleButton";

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
		<div
		// className="dark"
		>
			<div className=" bg-light-blue dark:bg-gray-800">
				<ToggleButton toggleId="dark-mode-toggle">
					<svg className="ml-3 w-10 h-10" viewBox="0 0 20 20">
						<path
							fill="#ffffff"
							d="M10.544,8.717l1.166-0.855l1.166,0.855l-0.467-1.399l1.012-0.778h-1.244L11.71,5.297l-0.466,1.244H10l1.011,0.778L10.544,8.717z M15.986,9.572l-0.467,1.244h-1.244l1.011,0.777l-0.467,1.4l1.167-0.855l1.165,0.855l-0.466-1.4l1.011-0.777h-1.244L15.986,9.572z M7.007,6.552c0-2.259,0.795-4.33,2.117-5.955C4.34,1.042,0.594,5.07,0.594,9.98c0,5.207,4.211,9.426,9.406,9.426c2.94,0,5.972-1.354,7.696-3.472c-0.289,0.026-0.987,0.044-1.283,0.044C11.219,15.979,7.007,11.759,7.007,6.552 M10,18.55c-4.715,0-8.551-3.845-8.551-8.57c0-3.783,2.407-6.999,5.842-8.131C6.549,3.295,6.152,4.911,6.152,6.552c0,5.368,4.125,9.788,9.365,10.245C13.972,17.893,11.973,18.55,10,18.55 M19.406,2.304h-1.71l-0.642-1.71l-0.642,1.71h-1.71l1.39,1.069l-0.642,1.924l1.604-1.176l1.604,1.176l-0.642-1.924L19.406,2.304z"
						></path>
					</svg>
				</ToggleButton>
				<div>
					<h1 className="text-center text-white dark:text-yellow-400 font-semibold text-5xl py-16 text ">
						Quiz App
					</h1>
				</div>

				<div className="grid-flow-row grid max-w-screen-lg grid-cols-1 grid-rows-10 gap-8 md:gap-10 md:grid-cols-2 md:grid-rows-5 mx-10 lg:mx-auto lg:gap-12 pb-10">
					{renderCards()}
				</div>
				<h2 className="text-white text-center font-medium text-3xl mb-4 ">
					You have{" "}
					<span className="text-green-600 dark:text-yellow-500">
						{check.filter((item) => item === 1).length}
					</span>{" "}
					correct answers!
				</h2>
				<div className="text-center pb-12">
					<button
						onClick={reset}
						className="px-4 ring-2 focus:ring-2 focus:outline-none py-2 rounded-sm dark:ring-yellow-500 dark:bg-gray-900 bg-medium-blue text-white"
					>
						Redo with different questions!
					</button>
				</div>
			</div>
		</div>
	);
};
