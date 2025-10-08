#2025.10.08 18:31 IMM

import threading
import time

counter = 0

def first_thread():
    global counter
    counter += 1
    print(f"1. counter = {counter}")

def second_thread(arg):
    print(f"3. counter = {arg}")

# Аналог C# кода
t1 = threading.Thread(target=first_thread)
t1.start()
time.sleep(0.1)  # Аналог Thread.Sleep(100)

print(f"2. counter = {counter}")

t2 = threading.Thread(target=second_thread, args=(counter,))
t2.start()