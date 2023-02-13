import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addTransaction, deleteTransaction, getTransactions, editTransaction } from "./transactionAPI";

const initialState = {
    transactions: [],
    isLoading: false,
    isError: false,
    error: ' ',
    editing: {}

}

// thunk 

export const fetchTransactions = createAsyncThunk(
    'transaction/fetchTransactions',
    async () => {
        const transactions = await getTransactions();
        return transactions


    }
);

export const createTransaction = createAsyncThunk(
    'transaction/createTransaction',
    async (data) => {
        const transaction = await addTransaction(data);
        return transaction


    }
);



export const changeTransaction = createAsyncThunk(
    'transaction/editTransaction',
    async ({ id, data }) => {
        const transaction = await editTransaction({ id, data })

        return transaction


    }
);

export const removeTransaction = createAsyncThunk(
    'transaction/removeTransaction',
    async (id) => {
        const transaction = await deleteTransaction(id);
        return transaction


    }
);


const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        editActive: (state, action) => {
            state.editing = action.payload
        },
        editInActive: (state, action) => {
            state.editing = {}


        }


    },

    extraReducers: (builder) => {
        builder.addCase(fetchTransactions.pending, (state, action) => {
            state.isError = false
            state.isLoading = true

        })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false
                state.transactions = action.payload

            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.error?.message
                state.transactions = []

            })
            .addCase(createTransaction.pending, (state, action) => {
                state.isError = false
                state.isLoading = true

            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.isError = false
                state.isLoading = false
                state.transactions.push(action.payload)

            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.error?.message


            })
            .addCase(changeTransaction.pending, (state, action) => {
                state.isError = false
                state.isLoading = true

            })
            .addCase(changeTransaction.fulfilled, (state, action) => {

                const indexToUpdate = state.transactions.findIndex(t => t.id === action.payload.id)
                state.transactions[indexToUpdate] = action.payload

                state.isError = false
                state.isLoading = false


            })
            .addCase(changeTransaction.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.error?.message


            })

            .addCase(removeTransaction.pending, (state, action) => {
                state.isError = false
                state.isLoading = true

            })
            .addCase(removeTransaction.fulfilled, (state, action) => {

                console.log(action)


                state.transactions = state.transactions.filter(transaction => transaction.id !== action?.meta?.arg)

                state.isError = false
                state.isLoading = false


            })
            .addCase(removeTransaction, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.error?.message


            })

    }



})

export default transactionSlice.reducer

export const { editActive, editInActive } = transactionSlice.actions











