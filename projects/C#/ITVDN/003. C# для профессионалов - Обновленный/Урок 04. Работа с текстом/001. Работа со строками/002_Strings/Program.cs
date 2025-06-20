﻿/*2024.11.12 09:35 IMM*/

using System;

// Работа с методом ToString().

namespace StringBasics
{
	class MyClass1 : object
    {
        /*
        Класс MyClass1 неявно наследуется от класса Object, который
        имеет метод ToString(), соответственно и класс MyClass1
        тоже имеет метод ToString()
        */
    }

    class MyClass2
	{
        // переопределение метода ToString()
        public override string ToString()
		{
			return "We changed the ToString()";
		}
	}

	class Program
	{
		static void Main()
		{
			// Создаем несколько переменных разных типов.
			Int32 myInt = 32;
			Double myDouble = 32.32;
            
			MyClass1 my1 = new MyClass1();
			MyClass2 my2 = new MyClass2();

			// Демонстрация работы метода ToString().
			Console.WriteLine("Примитивные типы:");

		    string s1 = 
                String.Format("myInt = {0:x} - Выводится само значение.", myInt);
			Console.WriteLine(s1);

			Console.WriteLine(
                "myDouble = {0} - Выводится само значение.", myDouble);

			Console.WriteLine("\nПользовательские типы:");

			Console.WriteLine(
                "my1 = {0} - Выводится полное квалифицированное имя типа.",
                my1.ToString());

			Console.WriteLine(
                "my2 = {0} - Выводится предопределенная строка.", my2.ToString());

			// Delay.
			Console.ReadKey();
		}
	}
}
