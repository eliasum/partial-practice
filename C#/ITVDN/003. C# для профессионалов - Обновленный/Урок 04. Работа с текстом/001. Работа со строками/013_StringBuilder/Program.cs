/*2024.11.19 10:00 IMM*/

using System;
using System.Text;

// Использование StringBuilder.

namespace StringBasics
{
	public class EntryPoint
	{
		static void Main()
		{
            /*
            создать экземпляр класса StringBuilder, который является аналогом
            оператора конкатенации строк "+", но работает быстрее и позволяет
            строить текст из строк
            */
            var builder = new StringBuilder();

            /*
            добавить в экземпляр builder класса StringBuilder копию указанной
            строки к концу данного экземпляра 3 раза
            */
            builder.Append("StringBuilder ").Append("является ").Append("очень ... ");

            /*
            преобразовать значение данного экземпляра класса StringBuilder
            в System.String
            */
            string build1 = builder.ToString();

            /*
            добавить в экземпляр builder класса StringBuilder копию указанной
            строки к концу данного экземпляра
            */
            builder.Append("быстрым");

            /*
            преобразовать значение данного экземпляра класса StringBuilder
            в System.String
            */
            string build2 = builder.ToString();

			Console.WriteLine(build1);
			Console.WriteLine(build2);

			// Delay.
			Console.ReadKey();
		}
	}
}