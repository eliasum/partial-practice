/*2020.09.27 15:35 IMM*/

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
        public void Method()    // метод ничего не принимает и ничего не возвращает
        {
            Console.WriteLine("Строку вывел метод сообщенный с делегатом.");
        }
    }

    // создаем класс-делегат с именем MyDelegate, 
    // метод, который будет сообщен с экземпляром данного класса-делегата,
    // не будет ничего принимать и возвращать (в данном примере)
    public delegate void MyDelegate(); // создаем класс-делегат, вместо слова class слово delegate, тела класса нет
    // делегат - это объект, с которым можно сообщить метод из другого объекта.

    class Program
    {
        static void Main(string[] args)
        {
        	// создаем новый экземпляр класса MyClass и присваиваем его перемеменной типа MyClass 
            MyClass instance = new MyClass();

            // создаем экземпляр делегата MyDelegate и сообщаем ему метод экземпляра класса MyClass:
            // инициализация экземпляра делегата неанонимным методом
            MyDelegate myDelegate = new MyDelegate(instance.Method); 
            // делегат - это специальный объект, предназначенный для хранения указателей на методы других объектов

            myDelegate.Invoke();    // вызываем метод, сообщенный с делегатом
            myDelegate();           // другой способ вызова метода, сообщенного с делегатом

            Console.ReadKey();
        }
    }
}
