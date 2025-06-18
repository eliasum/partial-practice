/*2020.09.27 17:48 IMM*/

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// делегаты

namespace _010_Delegates
{
    // создаем класс-делегат с именем Delegate1
    delegate Delegate2 Delegate1(); // класс-делегат Delegate1, вместо слова class слово delegate, тела класса нет
    // метод, который будет сообщен с экземпляром Delegate1, ничего не будет принимать
    // и будет возвращать экземпляр класса-делегата Delegate2

    // создаем класс-делегат с именем Delegate2
    delegate void Delegate2(); 		// класс-делегат Delegate2, вместо слова class слово delegate, тела класса нет
    // метод, который будет сообщен с экземпляром Delegate2, ничего не будет принимать
    // и ничего не будет возвращать
    
    class Program
    {
    	// статический метод Method1(), возвращающий экземпляр 
    	// класса-делегата Delegate2, которому сообщается метод Method2
        public static Delegate2 Method1()       
        {
            // инициализация экземпляра делегата неанонимным методом
            return new Delegate2(Program.Method2);
        }   // Method2 - метод, сообщенный с экземпляром класса-делегата Delegate2

        public static void Method2()        // статический метод, который сообщен классу-делегату Delegate2
        {
            Console.WriteLine("Hello world!");
        }

        static void Main(string[] args)
        {
            // создаем экземпляр класса-делегата Delegate1 с которым сообщен Method1
            // инициализация экземпляра делегата неанонимным методом
            Delegate1 delegate1 = new Delegate1(Program.Method1);                               

			// создаем экземпляр класса-делегата Delegate2    
			// и присваиваем ему возвращаемое значение метода, сообщенного с delegate1			
            Delegate2 delegate2 = delegate1();                      
            
            delegate2();            // вызываем метод Method2, сообщенный с делегатом delegate2
            delegate2.Invoke();     // другой способ вызова метода Method2, сообщенного с делегатом delegate2

            Console.ReadKey();
        }
    }
}
