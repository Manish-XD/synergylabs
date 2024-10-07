import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// Fetch all users
export const fetchUsers = createAsyncThunk('fetchUsers', async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    return response.json();
});

// Create a new user
export const createUser = createAsyncThunk('createUser', async (newUser) => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser)
    });
    return response.json();
});

// Update a user
export const updateUser = createAsyncThunk('updateUser', async ({ id, updatedUser }) => {
    console.log("id", id);
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser)
    });
    return response.json();
});

// Delete a user
export const deleteUser = createAsyncThunk('deleteUser', async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE'
    });
    return id;
});

const userSlice = createSlice({
    name: 'users',
    initialState: {
        isLoading: false,
        data: null, 
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            console.log('Error', action.payload);
            state.isError = true;
        });

        // Handle creating a user (CREATE)
        builder.addCase(createUser.fulfilled, (state, action) => {
            state.data.push(action.payload);  // Add new user to the list
        });

        // Handle updating a user (UPDATE)
        builder.addCase(updateUser.fulfilled, (state, action) => {
            const index = state.data.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
                state.data[index] = action.payload;  // Update user data
            }
        });

        // Handle deleting a user (DELETE)
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.data = state.data.filter(user => user.id !== action.payload);  // Remove deleted user
        });
    }
});

export default userSlice.reducer;