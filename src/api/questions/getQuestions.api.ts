import axios from "axios"
import { SelectTypeForm } from "~/routes/home"
import { Questions } from "../types/types.api"

export const getQuestions = async (options: SelectTypeForm) => {
    const response = await axios.get<Questions>(`https://opentdb.com/api.php?amount=${options.amount}&category=17&difficulty=${options.difficulty}&type=${options.type}`)
    return response
}