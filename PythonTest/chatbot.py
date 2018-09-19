import random
import Tkinter as tk

root = tk.Tk()
user_input = tk.Entry(root)
user_input.pack()

greetings = ['Hello', 'hello', 'hi', 'Hi', 'hey!', 'hey']
question = ['How are you?', 'How are you doing?']
responses = ['Okay', "I'm fine"]
huh = "I did not understand what you said"

memory = []

def cb(event):
    user_text = user_input.get()
    if user_text in greetings:
        bot_text = 'Hello, what is your name?'
    elif user_text in question:
        bot_text = random.choice(responses)
    else:
        bot_text = 'Thank you.'
        memory.append(str(user_text))
        print(memory)
    output.config(text=bot_text)

user_input.bind("<Return>", cb)
output = tk.Label(root, text='')
output.pack()

tk.mainloop()