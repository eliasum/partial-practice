using System;

namespace Classes
{
    class Body
    {
        string content;        // поле

        public string Content  // свойство
        {
            private get
            {
                if (content != null)
                    return content;
                else
                    return "Тело документа отсутствует.";
            }

            set 
            {
                content = value;
            }
        }

        public void Show()
        {
            Console.ForegroundColor = ConsoleColor.Blue;
            Console.WriteLine(content);
            Console.ForegroundColor = ConsoleColor.Gray;
        }
    }

}