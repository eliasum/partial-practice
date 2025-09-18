import os
import subprocess

def download_video_simple():
    url = "https://www.youtube.com/watch?v=1rRD9uMF92o"
    
    # Простая команда через системный вызов
    command = [
        "C:/Program Files (x86)/Microsoft Visual Studio/Shared/Python36_64/python.exe",
        "-m", "youtube_dl", 
        "-f", "best",
        url
    ]
    
    try:
        subprocess.run(command, check=True)
        print("✅ Видео скачано успешно!")
    except subprocess.CalledProcessError as e:
        print(f"❌ Ошибка при скачивании: {e}")
    except FileNotFoundError:
        print("❌ youtube-dl не установлен. Установите: python -m pip install youtube-dl")

if __name__ == "__main__":
    download_video_simple()