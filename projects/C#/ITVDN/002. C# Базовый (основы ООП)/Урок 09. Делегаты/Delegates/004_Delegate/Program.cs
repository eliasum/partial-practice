/*2020.09.27 16:55 IMM*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// комбинированные (групповые) делегаты - содержат в себе более одного метода

namespace _004_Delegate
{
    // создаем класс-делегат с именем MyDelegate, 
    // метод, который будет сообщен с экземпляром данного класса-делегата,
    // не будет ничего принимать и возвращать (в данном примере)
    public delegate void MyDelegate(); // создаем класс-делегат, вместо слова class слово delegate, тела класса нет
    // делегат - это объект, с которым можно сообщить метод из другого объекта.

    class Program
    {
        // методы
        public static void Method1()
        {
            Console.WriteLine("Method1");
        }

        public static void Method2()
        {
            Console.WriteLine("Method2");
        }

        public static void Method3()
        {
            Console.WriteLine("Method3");
        }

        static void Main(string[] args)
        {
            MyDelegate myDelegate = null;   // создаем переменную типа MyDelegate

            // создаем экземпляры делегата MyDelegate и сообщаем им методы:
            // инициализация экземпляров делегата неанонимными методами
            MyDelegate myDelegate1 = new MyDelegate(Method1);   
            MyDelegate myDelegate2 = new MyDelegate(Method2);
            MyDelegate myDelegate3 = new MyDelegate(Method3);

            // комбинируем делегаты
            myDelegate = myDelegate1 + myDelegate2 + myDelegate3;

            Console.WriteLine("Введите число от 1 до 7");
            string choise = Console.ReadLine();

            switch(choise)
            {
                case "1":
                    {
                        myDelegate1.Invoke();
                        break;
                    }
                case "2":
                    {
                        myDelegate2.Invoke();
                        break;
                    }
                case "3":
                    {
                        myDelegate3.Invoke();
                        break;
                    }
                case "4":
                    {
                        MyDelegate myDelegate4 = myDelegate - myDelegate1;
                        myDelegate4.Invoke();
                        break;
                    }
                case "5":
                    {
                        MyDelegate myDelegate5 = myDelegate - myDelegate2;
                        myDelegate5.Invoke();
                        break;
                    }
                case "6":
                    {
                        MyDelegate myDelegate6 = myDelegate - myDelegate3;
                        myDelegate6.Invoke();
                        break;
                    }
                case "7":
                    {
                        myDelegate.Invoke();
                        break;
                    }
                default:
                    {
                        Console.WriteLine("Вы ввели недопустимое значение");
                        break;
                    }
            }

            Console.ReadKey();
        }
    }
}
