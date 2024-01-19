import { Container } from "~/components/ui/Container";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/form/Select";
import { Button } from "~/components/ui/Button";
import { useForm, Controller } from "react-hook-form";
import { Heading } from "~/components/typography/Heading";
import { Input } from "~/components/form/Input";
import { Form } from "~/components/form/Form";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "~/store/hooks";
import { addQuestions } from "~/store/questions.reducer";
import { clearAnswers } from "~/store/userAnswers.reducer";
import { getQuestions } from "~/api/questions/getQuestions.api";

export interface SelectTypeForm {
	type: string;
	amount: number;
	difficulty: string;
}

export const HomePage = () => {
	const navigate = useNavigate();
	const { register, handleSubmit, control } = useForm<SelectTypeForm>();
	const dispatch = useAppDispatch();

	async function startQuiz(formData: SelectTypeForm) {
		const res = await getQuestions(formData);
		if (res.data.response_code === 0) {
			dispatch(addQuestions(res.data?.results));
			dispatch(clearAnswers());
			navigate("/questions");
		}
	}

	return (
		<section className="py-10">
			<Container className="space-y-5">
				<Heading className="text-center" level={1} as="h1">
					Settinggs
				</Heading>

				<Form
					className="flex flex-col gap-y-5 mx-auto w-2/5"
					onSubmit={handleSubmit(startQuiz)}
				>
					<Input defaultValue={10} {...register("amount")} type="number" />
					<Controller
						control={control}
						name="type"
						defaultValue="multiple"
						render={({ field: { onChange, value } }) => (
							<Select onValueChange={onChange} value={value} name="type">
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="multiple">Multiple</SelectItem>
									<SelectItem value="boolean">True / False</SelectItem>
								</SelectContent>
							</Select>
						)}
					/>
					<Controller
						control={control}
						name="difficulty"
						defaultValue="easy"
						render={({ field: { onChange, value } }) => (
							<Select
								defaultValue="easy"
								onValueChange={onChange}
								value={value}
								name="type"
							>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="easy">Easy</SelectItem>
									<SelectItem value="medium">Medium</SelectItem>
									<SelectItem value="hard">Hard</SelectItem>
								</SelectContent>
							</Select>
						)}
					/>

					<Button className="w-full" type="submit">
						Start
					</Button>
				</Form>
			</Container>
		</section>
	);
};
