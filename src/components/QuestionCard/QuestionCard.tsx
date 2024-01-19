import { FC } from "react";
import { Heading } from "../typography/Heading";
import { Button } from "../ui/Button";

export const QuestionCard: FC<QuestionCard> = ({
	question,
	answers,
	questionId,
	selectHandler,
}) => {
	return (
		<article className="text-center bg-yellow-400 h-96 pt-10">
			<Heading className="mb-10">{question}</Heading>
			<div className="grid grid-cols-2 gap-20 content-normal justify-items-center">
				{answers.map((answer) => (
					<Button
						onClick={() => selectHandler(questionId, answer)}
						key={answer}
						className="w-1/3 focus:bg-violet-700"
					>
						{answer}
					</Button>
				))}
			</div>
		</article>
	);
};

interface QuestionCard {
	questionId: string;
	question: string;
	answers: string[];
	selectHandler: (questionId: string, answer: string) => void;
}
