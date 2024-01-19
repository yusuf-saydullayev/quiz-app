import { useNavigate } from "react-router-dom";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
} from "~/components/Carousel/Carousel";
import { QuestionCard } from "~/components/QuestionCard";
import { Heading } from "~/components/typography/Heading";
import { Button } from "~/components/ui/Button";
import { Container } from "~/components/ui/Container";
import { useAppDispatch, useAppSelector } from "~/store/hooks";
import { answerTheQuestions } from "~/store/userAnswers.reducer";

export const QuestionsPage = () => {
	const navigate = useNavigate();
	const questions = useAppSelector((state) => state.questions.questions);

	const dispatch = useAppDispatch();

	const selectAnswer = (questionId: string, answer: string) => {
		const isCorrect = questions.find((q) => q.questionId === questionId);
		if (isCorrect?.correctAnswer === answer) {
			dispatch(answerTheQuestions({ questionId, answer }));
		}
	};

	return (
		<section className="py-5">
			<Heading className="text-center mb-10" as="h1">
				Questions
			</Heading>
			<Container>
				<Carousel>
					<CarouselContent>
						{questions.map((question) => (
							<CarouselItem key={question.questionId}>
								<QuestionCard
									selectHandler={selectAnswer}
									answers={question.allAnswers}
									questionId={question.questionId}
									question={question.question}
								/>
							</CarouselItem>
						))}
					</CarouselContent>
					<CarouselNext />
				</Carousel>
			</Container>
			<Button onClick={() => navigate("/score")} className="mx-auto mt-14">
				Finish
			</Button>
		</section>
	);
};
