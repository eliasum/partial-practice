#2025.10.14 18:14 IMM

import threading
import time

class MyClass:
    def __init__(self):
        self.lock = threading.Lock()  # аналог object block + lock
    
    def method(self):
        thread_hash = threading.current_thread().ident
        
        # Критическая секция
        with self.lock:  # аналог lock(block) в C#
            for counter in range(10):
                print(f"Поток # {thread_hash}: шаг {counter}")
                time.sleep(0.1)
            print('-' * 20)

# Запуск
instance = MyClass()
for i in range(3):
    threading.Thread(target=instance.method).start()