import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedAnswer {
    questionId: string
    answer: string
}

interface TestState {
    score: number
    questions: { questionId: string, answer: string }[]
}

const initialState: TestState = {
    score: 0,
    questions: []
};

const userAnswersSlice = createSlice({
    name: 'userAnswers',
    initialState,
    reducers: {
        answerTheQuestions: (state, action: PayloadAction<SelectedAnswer>) => {
            const { questionId, answer } = action.payload
            const existInAnswer = state.questions.find(q => q.questionId === questionId)
            if (!existInAnswer) {
                state.questions.push({ questionId, answer });
                state.score += 1;
            }

        },
        clearAnswers: (state) => {
            state.questions = []
            state.score = 0
        }
    },
});

export const { answerTheQuestions, clearAnswers } = userAnswersSlice.actions;
export default userAnswersSlice.reducer;