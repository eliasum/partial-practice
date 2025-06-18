﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

//Важно:
//Если вы создали пользовательский конструктор (принимающий аргументы),
//то конструктор по умолчанию автоматически создаваться НЕ БУДЕТ, его придется создать явно.


namespace ConsoleApplication1
{
    class Program
    {
        static void Main(string[] args)
        {
            Point point = new Point("A");
            Console.WriteLine("{0}.X = {1} {0}.Y = {2}", point.Name, point.X, point.Y);

            Console.ReadKey();
        }
    }
}
