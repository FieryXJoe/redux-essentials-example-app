import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
    {
        id: '1', title: 'First Post!', content: 'Hello!',
        date: '2022-05-10T09:11:26.796Z'
    },
    {
        id: '2', title: 'Second Post', content: 'More text',
        date: '2022-05-10T09:11:11.700Z'
    }
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(title, content, userId) {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                        user: userId
                    }
                }
            }
        },
        postUpdated(state, action) {
            const { id, title, content } = action.payload
            const existingPost = state.find(post => post.id === id)
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    }
})
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer