from googleapiclient.discovery import build
import re
import datetime

# Вставьте свой API ключ сюда (сгенерирован через Google API Console)
API_KEY = 'AIzaSyDiPz5dhA30xWrbZQp1K-XpkdAf2lOib0w'

# ID канала, с которого мы будем собирать видео (получить можно через настройки канала на YouTube)
CHANNEL_ID = 'UCcnjJu-ejZlLaz-OwpBd7dQ'

# Создаем объект для работы с YouTube API (используем ключ для авторизации)
youtube = build('youtube', 'v3', developerKey=API_KEY)

# Функция для получения всех видео с канала
def get_channel_videos(channel_id):
    videos = []  # Список, в который будем собирать данные о видео
    
    # Создаем запрос к API для поиска видео по ID канала. Максимум 50 видео за один запрос.
    request = youtube.search().list(part='snippet', channelId=channel_id, maxResults=50)
    
    # Пока запрос возвращает данные (пагинация), продолжаем их обрабатывать
    while request:
        try:
            # Выполняем запрос к YouTube API и получаем ответ
            response = request.execute()
            
            # Печатаем информацию о ответе для отладки
            print(f"Response: {response}")
        except Exception as e:
            # Если при запросе возникла ошибка, выводим ее и прекращаем выполнение
            print(f"Error occurred while fetching videos: {e}")
            break
        
        # Проходим по каждому элементу из ответа API
        for item in response['items']:
            # Проверяем, что это видео (а не плейлист, канал или другое)
            if item['id']['kind'] == 'youtube#video':
                video_id = item['id']['videoId']  # Получаем ID видео
                # Получаем детали этого видео (например, длительность)
                video_data = get_video_details(video_id)
                # Добавляем данные о видео в список
                if video_data:
                    videos.append(video_data)
        
        # Получаем следующий запрос, если существует (пагинация в YouTube API)
        request = youtube.search().list_next(request, response)
    
    # Печатаем, сколько видео мы собрали
    print(f"Total videos fetched: {len(videos)}")
    
    return videos  # Возвращаем все собранные видео

# Функция для получения подробной информации о видео (например, длительность)
def get_video_details(video_id):
    try:
        # Запрашиваем подробности о видео, включая его длительность
        request = youtube.videos().list(part='contentDetails', id=video_id)
        response = request.execute()
        
        # Извлекаем данные о видео
        video = response['items'][0]
        video_duration = video['contentDetails']['duration']  # Длительность видео в формате ISO 8601
        
        # Преобразуем длительность из формата ISO 8601 в секунды
        duration = parse_duration(video_duration)
        
        # Создаем URL для видео
        video_url = f"https://www.youtube.com/watch?v={video_id}"
        
        # Возвращаем информацию о видео в виде словаря
        return {
            'video_url': video_url,  # Ссылка на видео
            'duration': duration  # Длительность видео в секундах
        }
    except Exception as e:
        # Если при запросе информации о видео произошла ошибка, выводим ошибку
        print(f"Error fetching video details for {video_id}: {e}")
        return None  # Возвращаем None, если произошла ошибка

# Функция для парсинга длительности видео из формата ISO 8601
def parse_duration(duration):
    # Регулярное выражение для извлечения часов, минут и секунд из строки вида PT1H2M3S
    regex = r'PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?'
    match = re.match(regex, duration)  # Применяем регулярное выражение
    
    # Извлекаем количество часов, минут и секунд (если они есть)
    hours = int(match.group(1) or 0)  # Если часов нет, считаем их 0
    minutes = int(match.group(2) or 0)  # Если минут нет, считаем их 0
    seconds = int(match.group(3) or 0)  # Если секунд нет, считаем их 0
    
    # Преобразуем длительность в секунды и возвращаем
    return hours * 3600 + minutes * 60 + seconds

# Функция для сортировки видео по длительности (по убыванию)
def sort_videos_by_duration(videos):
    # Сортируем список видео по длительности (по убыванию)
    return sorted(videos, key=lambda x: x['duration'], reverse=True)

# Запись в файл
def write_videos_to_file(videos, filename):
    with open(filename, 'w', encoding='utf-8') as file:
        for video in videos:
            video_duration_str = str(datetime.timedelta(seconds=video['duration']))  # Преобразуем длительность в ЧЧ:ММ:СС
            file.write(f"Video URL: {video['video_url']} - Duration: {video_duration_str}\n")
        print(f"Results have been written to {filename}")

# Получаем все видео с канала, используя его ID
videos = get_channel_videos(CHANNEL_ID)

# Сортируем видео по длительности
sorted_videos = sort_videos_by_duration(videos)

# Записываем результат в текстовый файл
output_filename = "sorted_videos.txt"  # Имя файла для записи
if sorted_videos:
    write_videos_to_file(sorted_videos, output_filename)
else:
    print("No videos found.")
