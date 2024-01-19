import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Result } from '~/api/types/types.api';
import { v4 as uuidv4 } from 'uuid';

interface Question {
  questionId: string
  question: string;
  correctAnswer: string;
  allAnswers: string[];
}
interface TestState {
  questions: Question[]
}

const initialState: TestState = {
  questions: [],
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    addQuestions: (state, action: PayloadAction<Result[]>) => {
      const newQuestions: Question[] = action.payload.map((result) => {
        const answers = [...result.incorrect_answers];
        answers.splice(
          getRandomInt(result.incorrect_answers.length),
          0,
          result.correct_answer
        );
        
        return {
          questionId: uuidv4(),
          question: result.question,
          correctAnswer: result.correct_answer,
          allAnswers: answers
        }
      })
      state.questions = newQuestions
    }
  },
});

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const { addQuestions } = testSlice.actions;
export default testSlice.reducer;