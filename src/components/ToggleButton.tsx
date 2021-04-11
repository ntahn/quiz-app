import React, { useState, useEffect } from "react";

interface Props {
	toggleId: string;
}

export const ToggleButton: React.FC<Props> = ({ toggleId, children }) => {
	const [checkBox, setCheckBox] = useState(false);

	useEffect(() => {
		document.getElementById(toggleId)?.addEventListener("click", () => {
			if (localStorage.theme === "dark") {
				document.documentElement.classList.remove("dark");
				localStorage.removeItem("theme");
			} else {
				document.documentElement.classList.add("dark");
				localStorage.theme = "dark";
			}
		});
	});

	return (
		<div className="absolute top-4 right-2">
			<label htmlFor={toggleId} className="flex items-center cursor-pointer">
				{/* toggle */}
				<div className="relative">
					{/* input */}
					<input
						checked={checkBox}
						type="checkbox"
						onChange={(e) => {
							setCheckBox(e.target.checked);
						}}
						id={toggleId}
						className="sr-only"
					/>
					{/* dot */}
					{checkBox ? (
						<div className="transform translate-x-full absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition" />
					) : (
						<div className="absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition" />
					)}

					{/* line */}
					<div className="block bg-medium-blue dark:bg-gray-600 w-14 h-8 rounded-full" />
				</div>
				{/* label */}
				{children}
			</label>
		</div>
	);
};
