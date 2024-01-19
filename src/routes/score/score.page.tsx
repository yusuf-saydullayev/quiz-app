import { Heading } from "~/components/typography/Heading";
import { Button } from "~/components/ui/Button";
import { cn } from "~/libs/cn.lib";
import { useAppSelector } from "~/store/hooks";

export const ScorePage = () => {
	const score = useAppSelector((state) => state.userAnswers.score);
	const allQuestions = useAppSelector((state) => state.questions.questions);

	return (
		<section className="*:text-center space-y-5">
			<Heading as="h1">Your Score</Heading>
			<Heading>{score}</Heading>
			{allQuestions.map(({ question, allAnswers, correctAnswer }) => (
				<article className="text-center bg-yellow-400 h-96 pt-10">
					<Heading className="mb-10">{question}</Heading>
					<div className="grid grid-cols-2 gap-20 content-normal justify-items-center">
						{allAnswers.map((answer) => (
							<Button
								key={answer}
								className={cn("w-1/3", {
									"bg-green-700 hover:bg-green-700": answer === correctAnswer,
								})}
							>
								{answer}
							</Button>
						))}
					</div>
				</article>
			))}
		</section>
	);
};
