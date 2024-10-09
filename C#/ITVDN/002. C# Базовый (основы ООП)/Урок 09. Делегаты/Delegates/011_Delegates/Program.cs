/*2020.09.27 18:08 IMM*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

//делегаты

namespace _011_Delegates
{
    // создаем класс-делегат с именем Functional
    delegate Delegate3 Functional(Delegate1 delegate1, Delegate2 delegate2);    // класс-делегат Functional, вместо слова class слово delegate, тела класса нет
    // метод, который будет сообщен с делегатом Functional,
    // будет принимать 2 аргумента типа Delegate1 и Delegate2, а возвращать типа Delegate3

    // создаем делегаты, которые ничего не принимают и возвращают тип string
    // вместо слова class слово delegate, тела класса нет:
    delegate string Delegate1();
    delegate string Delegate2();
    delegate string Delegate3();

    class Program
    {
        // статический метод, который будет сообщен с делегатом Functional
        public static Delegate3 MethodF(Delegate1 delegate1, Delegate2 delegate2)
        {
            return delegate { return delegate1.Invoke() + delegate2.Invoke(); };
            /*
            delegate {} - анонимный (лямбда) метод без входных параметров, сообщенный 
            экземпляру класса-делегата Delegate3. 
            Здесь слово delegate используется вместо сигнатуры лямбда-метода
            
            Другие варианты написания:
            return () => { return delegate1.Invoke() + delegate2.Invoke(); }; - лямбда-оператор:
            отличие - убрали слово delegate, добавили () и =>

            return () => delegate1.Invoke() + delegate2.Invoke(); - лямбда-выражение
            отличие - убрали слово return и {}
            */
        }

        // статический метод, который будет сообщен классу-делегату Delegate1
        public static string Method1() { return "Hello "; }

        // статический метод, который будет сообщен классу-делегату Delegate2
        public static string Method2() { return "world!"; }

        static void Main(string[] args)
        {
            // создаем экземпляр класса-делегата Functional и сообщаем с ним метод MethodF()
            // инициализация экземпляра делегата неанонимным методом
            Functional functional = new Functional(Program.MethodF);

            // создаем экземпляр класса-делегата Delegate3
            // инициализация входных экземпляров делегатов неанонимными методами
            Delegate3 delegate3 = functional.Invoke(new Delegate1(Program.Method1), new Delegate2(Program.Method2));
            // и присваиваем ему возвращаемое значение метода, сообщенного с functional

            // другой способ вызова метода MethodF, сообщенного с классом-делегатом Delegate3
            // инициализация входных экземпляров делегатов неанонимными методами
            Delegate3 delegate4 = functional(new Delegate1(Program.Method1), new Delegate2(Program.Method2));

            Console.WriteLine(delegate3.Invoke());  // или Console.WriteLine(delegate3());

            Console.ReadKey();
        }
    }
}
