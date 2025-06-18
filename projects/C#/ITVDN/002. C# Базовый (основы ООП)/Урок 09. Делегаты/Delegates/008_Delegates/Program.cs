/*2020.09.27 17:44 IMM*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// лямбда выражения и лямбда операторы

namespace _008_Delegates
{
    // создаем класс-делегат, вместо слова class слово delegate, тела класса нет
    public delegate int MyDelegate(int a);
    
    class Program
    {
        static void Main(string[] args)
        {
            // создаем переменную типа класса-делегата MyDelegate
            MyDelegate myDelegate;

            // создаем экземпляр класса-делегата MyDelegate и сообщаем с ним анонимный метод (лямбда-метод)
            // инициализация экземпляра делегата анонимным методом
            myDelegate = delegate (int x) { return x * 2; };    // анонимный (лямбда) метод (с одним входным параметром x)
            // здесь слово delegate используется вместо сигнатуры лямбда-метода

            // информация о типе входного параметра содержится в объявлении класса-делегата
            // в следующих двух случаях:

            myDelegate = (x) => { return x * 2; };              // лямбда-оператор
            // отличие - убрали слово delegate и тип возвращаемого значения, добавили =>

            myDelegate = x => x * 2;                            // лямбда-выражение
            // отличие - убрали () вокруг входного параметра, слово return и {}

            int result = myDelegate(4); // вызов анонимного метода, сообщенного с делегатом

            Console.WriteLine(result);

            Console.ReadKey();
        }
    }
}
