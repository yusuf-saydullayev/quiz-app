import { Heading } from "~/components/typography/Heading";
import { Text } from "~/components/typography/Text";
import { Button } from "~/components/ui/Button";
import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.min.css";
import { registerAllModules } from "handsontable/registry";
import { Container } from "~/components/ui/Container";
import { cn } from "~/libs/cn.lib";
import { useAppSelector } from "~/store/hooks";

registerAllModules();

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
			<Container className="py-10 flex justify-center flex-col items-center">
				<Heading className="my-6">Data grid</Heading>
				<Text>I don't want to not configure and customaize</Text>
				<HotTable
					data={[
						{
							brand: "Jetpulse",
							model: "Racing Socks",
							price: 30,
							sellDate: "Oct 11, 2023",
							sellTime: "01:23 AM",
						},
						{
							brand: "Gigabox",
							model: "HL Mountain Frame",
							price: 1890.9,
							sellDate: "May 3, 2023",
							sellTime: "11:27 AM",
						},
						{
							brand: "Camido",
							model: "Cycling Cap",
							price: 130.1,
							sellDate: "Mar 27, 2023",
							sellTime: "03:17 AM",
						},
						{
							brand: "Chatterpoint",
							model: "Road Tire Tube",
							price: 59,
							sellDate: "Aug 28, 2023",
							sellTime: "08:01 AM",
						},
						{
							brand: "Eidel",
							model: "HL Road Tire",
							price: 279.99,
							sellDate: "Oct 2, 2023",
							sellTime: "13:23 AM",
						},
						{
							brand: "Eidel",
							model: "HL Road Tire",
							price: 279.99,
							sellDate: "Oct 2, 2023",
							sellTime: "13:23 AM",
						},
						{
							brand: "Eidel",
							model: "HL Road Tire",
							price: 279.99,
							sellDate: "Oct 2, 2023",
							sellTime: "13:23 AM",
						},
						{
							brand: "Eidel",
							model: "HL Road Tire",
							price: 279.99,
							sellDate: "Oct 2, 2023",
							sellTime: "13:23 AM",
						},
						{
							brand: "Eidel",
							model: "HL Road Tire",
							price: 279.99,
							sellDate: "Oct 2, 2023",
							sellTime: "13:23 AM",
						},
						{
							brand: "Eidel",
							model: "HL Road Tire",
							price: 279.99,
							sellDate: "Oct 2, 2023",
							sellTime: "13:23 AM",
						},
						{
							brand: "Eidel",
							model: "HL Road Tire",
							price: 279.99,
							sellDate: "Oct 2, 2023",
							sellTime: "13:23 AM",
						},
						{
							brand: "Camido",
							model: "Cycling Cap",
							price: 130.1,
							sellDate: "Mar 27, 2023",
							sellTime: "03:17 AM",
						},
						{
							brand: "Camido",
							model: "Cycling Cap",
							price: 130.1,
							sellDate: "Mar 27, 2023",
							sellTime: "03:17 AM",
						},
						{
							brand: "Camido",
							model: "Cycling Cap",
							price: 130.1,
							sellDate: "Mar 27, 2023",
							sellTime: "03:17 AM",
						},
					]}
					columns={[
						{
							title: "name",
							type: "text",
							data: "brand",
						},
						{
							title: "Model",
							type: "text",
							data: "model",
						},
						{
							title: "Price",
							type: "numeric",
							data: "price",
							numericFormat: {
								pattern: "$ 0,0.00",
								culture: "en-US",
							},
						},
						{
							title: "Date",
							type: "date",
							data: "sellDate",
							dateFormat: "MMM D, YYYY",
							correctFormat: true,
							className: "htRight",
						},
						{
							title: "Time",
							type: "time",
							data: "sellTime",
							timeFormat: "hh:mm A",
							className: "htRight",
						},
					]}
					colWidths={100}
					width="30%"
					height={320}
					rowHeaders={true}
					colHeaders={true}
					columnSorting={true}
					fixedColumnsStart={1}
					autoWrapRow={true}
					autoWrapCol={true}
					licenseKey="non-commercial-and-evaluation"
				/>
			</Container>
		</section>
	);
};
