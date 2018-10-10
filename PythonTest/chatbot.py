import random
import Tkinter as tk
import sys
from docx import Document
import time

root = tk.Tk()
user_input = tk.Entry(root)
user_input.pack()

greetings = ['Hello', 'hello', 'hi', 'Hi', 'hey!', 'hey']
question = ['What is your name?', 'How old are you?', 'What is your email?', 'That is all.']
question_answers = ['What is your name?', 'How old are you?', 'What is your email?']
responses = ['Okay', "I'm fine"]
huh = "I did not understand what you said"

#memory = []

def print_to_doc():
    document = Document()
    with open("chatbot_output.txt") as file:
        for line in file:
            p = document.add_paragraph(line)
    document.save('chatbot_output.docx')

def cb(event):
    user_text = user_input.get()
    if user_text in greetings:
        bot_text = 'Hello, ' + question[0]
    elif user_text in question:
        bot_text = random.choice(responses)
    else:
        bot_text = 'Thank you. ' + question[1]
        del question[1]
        #memory.append(str(user_text))
        user_text_str = str(user_text)
        #print(memory)
        with open('/Users/JYang/Desktop/je-yang/chatbot/PythonTest/chatbot_output.txt', 'a') as f:
            sys.stdout = f
            print question_answers[0] + ' ' + user_text_str
            del question_answers[0]
            #if len(question_answers) == 0:
            #    sys.stdout = sys.__stdout__
            sys.stdout = sys.__stdout__
    output.config(text=bot_text)

user_input.bind("<Return>", cb)
output = tk.Label(root, text='')
output.pack()

tk.mainloop()








