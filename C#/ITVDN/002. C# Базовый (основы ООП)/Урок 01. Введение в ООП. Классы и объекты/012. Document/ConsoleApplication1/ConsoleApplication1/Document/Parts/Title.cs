using System;

namespace Classes
{
    class Title
    {
        string content;        // поле

        public string Content  // свойство
        {
            private get
            {
                if (content != null)
                    return content;
                else
                    return "Заголовок отсутствует.";
            }

            set
            {
                content = value;
            }
        }

        public void Show()     
        {
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine(content);
            Console.ForegroundColor = ConsoleColor.Gray;
        }
    }

}