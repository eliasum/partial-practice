/*2020.09.27 16:13 IMM*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// делегаты

namespace _001_Delegates
{
    // класс, метод которого будет сообщен с делегатом
    class MyClass
    {
        // создаем метод, который планируем сообщить с делегатом
        public string Method(string name)
        {
            return "Hello " + name;
        }
    }

    // создаем класс-делегат с именем MyDelegate, 
    // метод, который будет сообщен с экземпляром данного класса-делегата,
    // будет принимать и возвращать значение типа string
    public delegate string MyDelegate(string name); // создаем класс-делегат, вместо слова class слово delegate, тела класса нет
    // делегат - это объект, с которым можно сообщить метод из другого объекта.

    class Program
    {
        static void Main(string[] args)
        {
        	// создаем экземпляр класса MyClass и присваиваем его переменной типа MyClass
            MyClass instance = new MyClass();

            // создаем экземпляр делегата MyDelegate и сообщаем ему метод на экземпляре класса MyClass
            // инициализация экземпляра делегата неанонимным методом
            MyDelegate myDelegate = new MyDelegate(instance.Method); 
            // делегат - это специальный объект, предназначенный для хранения указателей на методы.
            
            string greeting = myDelegate.Invoke("Jeffrey Richter");    // вызываем метод, сообщенный с делегатом

            Console.WriteLine(greeting);

            greeting = myDelegate("Grady Booch");           // другой способ вызова метода, сообщенного с делегатом
            Console.WriteLine(greeting);

            Console.ReadKey();
        }
    }
}
