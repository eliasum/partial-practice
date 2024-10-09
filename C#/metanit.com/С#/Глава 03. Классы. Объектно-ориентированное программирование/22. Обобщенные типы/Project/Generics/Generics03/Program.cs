/*2020.07.11 17:47 IMM*/

using System;

namespace Generics03
{
    //Обобщенные методы

    //Кроме обобщенных классов можно также создавать обобщенные методы, которые
    //точно также будут использовать универсальные параметры. Например:

    class Program
    {
        private static void Main(string[] args)
        {
            int x = 7;
            int y = 25;

            Swap<int>(ref x, ref y); // или так Swap(ref x, ref y);

            Console.WriteLine($"x={x}    y={y}");   // x=25   y=7

            string s1 = "hello";
            string s2 = "bye";

            Swap<string>(ref s1, ref s2); // или так Swap(ref s1, ref s2);

            Console.WriteLine($"s1={s1}    s2={s2}"); // s1=bye   s2=hello

            Console.Read();
        }
        public static void Swap<T>(ref T x, ref T y)
        {
            T temp = x;
            x = y;
            y = temp;
        }
    }
}

//Здесь определен обощенный метод Swap, который принимает параметры по 
//ссылке и меняет их значения. При этом в данном случае не важно, какой
//тип представляют эти параметры.

//В методе Main вызываем метод Swap, типизируем его определенным типом
//и передаем ему некоторые значения.
