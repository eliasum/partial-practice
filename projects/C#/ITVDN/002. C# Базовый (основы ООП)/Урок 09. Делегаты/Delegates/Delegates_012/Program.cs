/*2020.09.28 21:55 IMM*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

//делегаты

namespace _011_Delegates
{
    // создаем класс-делегат с именем Functional
    delegate MyDelegate Functional(MyDelegate delegate1, MyDelegate delegate2); // класс-делегат Functional, вместо слова class слово delegate, тела класса нет
    // метод, который будет сообщен с делегатом Functional,
    // будет принимать 2 аргумента типа MyDelegate и возвращать тип MyDelegate

    // создаем делегат, который возвращает тип string, вместо слова class слово delegate, тела класса нет:
    delegate string MyDelegate();

    class Program
    {
        static void Main(string[] args)
        {
            /*
                создаем 2 экземпляра класса-делегата MyDelegate и сообщаем с ними
                лямбда-выражения без входных параметров, которые возвращают строки 
                "Hello " и "world" соответственно.
                Инициализация экземпляров делегатов анонимными методами
            */
            MyDelegate delegate1 = () => "Hello ", delegate2 = () => "world!";
            /*
                Другие варианты написания:

                Через лямбда-оператор:
                MyDelegate delegate1 = () => { return "Hello ";} , delegate2 = () => { return "world!";};

                Через лямбда-метод (анонимный метод):
                MyDelegate delegate1 = delegate { return "Hello ";} , delegate2 = delegate { return "world!";};
                Здесь слово delegate используется вместо сигнатуры лямбда-метода
            */

            // создаем экземпляр класса-делегата Functional и сообщаем с ним анонимный (лямбда) метод
            // инициализация экземпляра делегата анонимным методом
            Functional functional = delegate (MyDelegate d1, MyDelegate d2) { return delegate() { return d1.Invoke() + d2.Invoke(); }; };
            // Здесь слово delegate используется вместо сигнатуры лямбда-метода

            /*
                Эту строку можно рассмотреть так:
                Functional functional = delegate ('2 аргумента') { return 'значение типа MyDelegate' }; 
                Значит если возвращаемое 'значение типа MyDelegate', то вроде можно еще упростить выражение,
                создав экземпляр типа MyDelegate, который объединяет delegate1 и delegate2.

                Создадим экземпляр MyDelegate:
                MyDelegate delegate3 = delegate1 + delegate2;
                Тогда:
                Functional functional = delegate ('2 аргумента') { return delegate3(); }; 

                Упростим:
                Functional functional = ('2 аргумента') => { return delegate3(); }; // лямбда-оператор
                Functional functional = ('2 аргумента') => delegate3();             // лямбда-выражение

                Functional functional = (MyDelegate d1, MyDelegate d2) => delegate3();

                После этих преобразований компилятор подчеркнул delegate3(), т.к. есть 2 ошибки:
                1. не удается неявно преобразовать тип string в MyDelegate.
                2. не удается преобразовать лямбда-выражение в требуемый тип делегата, т.к. некоторые возвращаемые 
                типы блока не могут быть неявно преобразованы в возвращаемый тип делегата.
            */

            Functional functional_ = delegate (MyDelegate d1, MyDelegate d2) { return delegate () { return d1.Invoke() + d2.Invoke(); }; };
            /*
                 Итак, создаем экземпляр класса-делегата Functional и сообщаем с ним лямбда-метод (анонимный).
                 Лямбда-метод, который сообщен с делегатом Functional, принимает 2 аргумента типа MyDelegate
                 и возвращает тип MyDelegate. Таким образом, возвращаемое значение есть вложенный лямбда-метод,
                 возвращающий сумму вызовов 2-х экземпляров MyDelegate.

                 Нужно совершить конкатенацию двух строк "Hello " и "world!", которые сообщены 2-м делегатам типа 
                 MyDelegate. На каждом экземпляре типа MyDelegate, т.е. на d1 и d2, вызывается метод Invoke(), т.е.
                 вызывается метод, сообщенный с делегатом. Этот метод - возврат соответствующего строкового значения:

                 MyDelegate delegate1 = () => "Hello ", delegate2 = () => "world!";
                 
                 Другие варианты написания:

                 Через лямбда-оператор:
                 MyDelegate delegate1 = () => { return "Hello ";} , delegate2 = () => { return "world!";};

                 Через лямбда-метод (анонимный метод):
                 MyDelegate delegate1 = delegate { return "Hello ";} , delegate2 = delegate { return "world!";};

                 Итак, d1.Invoke() + d2.Invoke() - возврат конкатинирующей строки "Hello world!". Теперь полученную
                 строку нужно вернуть с помощью слова return:
                 { return d1.Invoke() + d2.Invoke(); };
                 Возвращаемое значение этой анонимной функции типа string. Чтобы явно преобразовать значение типа string 
                 в значение типа MyDelegate, к этой анонимной функции нужно применить оператор delegate (). Здесь 
                 () необязательны, они только показывают, что у лямбда функции нет входных параметров. Это значение
                 типа MyDelegate необходимо вернуть, для чего используется слово return.

                 Выражение можно упростить:
                 Functional functional = delegate (MyDelegate d1, MyDelegate d2) { return delegate () { return d1.Invoke() + d2.Invoke(); }; };

            */

            // Functional functional = delegate (MyDelegate d1, MyDelegate d2) { return () => d1.Invoke() + d2.Invoke(); };
            // Functional functional = (MyDelegate d1, MyDelegate d2) => () => d1() + d2();

            // Console.WriteLine((functional.Invoke(delegate1, delegate2)).Invoke());
            Console.WriteLine(functional(delegate1, delegate2)());


            Console.ReadKey();
        }
    }
}   
