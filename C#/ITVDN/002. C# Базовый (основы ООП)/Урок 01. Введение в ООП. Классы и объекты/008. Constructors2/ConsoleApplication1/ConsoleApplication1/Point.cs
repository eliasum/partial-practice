using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

// Конструктор может вызывать в том же самом объекте другой конструктор с помощью ключевого слова this

namespace ConsoleApplication1
{
    class Point
    {
        // Поля
        private int x, y;
        private string name; 

        // Свойства
        public int X
        {
            get { return x; }
        }

        public int Y
        {
            get { return y; }
        }

        public string Name
        {
            get { return name; }
        }

        // Конструкторы.

        // Использование ключевого слова this в конструкторе с одним параметром 
        // приводит к вызову этого конструктора
        public Point(int x, int y)
        {
            Console.WriteLine("Конструктор с двумя параметрами.");
            this.x = x;
            this.y = y;
        }

        // Использование ключевого слова this в конструкторе приводит к вызову конструктора с двумя параметрами
        public Point(string name)
            : this(300, 400)
        {
            Console.WriteLine("Конструктор с одним параметром.");
            this.name = name;
        }
    }
}
