import { create } from "zustand";
//zustan state management library  to efficiently manage states
const useConversation = create((set) => ({
	selectedConversation: null,
	setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
	messages: [],
	setMessages: (messages) => set({ messages }),
}));

export default useConversation;
//zustand used instead of Context Api
//same as usestate   