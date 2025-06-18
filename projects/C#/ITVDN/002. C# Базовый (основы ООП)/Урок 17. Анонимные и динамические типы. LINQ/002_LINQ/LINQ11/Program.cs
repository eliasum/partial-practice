/*2022.10.11 16:32 IMM*/
using System;
using System.Collections.Generic;
using System.Linq;

// let - представляет новый локальный идентификатор, на который можно ссылаться в остальной части запроса.
// Его можно представить, как локальную переменную, видимую только внутри выражения запроса.

namespace LINQ
{
    public class Employee
    {
        public string LastName { get; set; }
        public string FirstName { get; set; }
    }

    class Program
    {
        static void Main()
        {
            // Построить коллекцию сотрудников.
            var employees = new List<Employee>
            {
                // список из анонимных экземпляров класса Employee
                new Employee {LastName = "Ivanov", FirstName = "Ivan"},
                new Employee {LastName = "Andreev", FirstName = "Andrew"},
                new Employee {LastName = "Petrov", FirstName = "Petr"}
            };

            // Построить запрос.
            /*
                присвоить переменной запроса linq возвращаемое значение выражения запроса, которое 
                трансформируется в последовательность вызовов расширяющих методов
            */
            var query = from emp in employees                                   // from - объявляет переменную диапазона emp.
                        let fullName = emp.FirstName + " " + emp.LastName       // let - новый локальный идентификатор.
                        orderby fullName descending                             // orderby - упорядочить
                        select fullName;                                        // select - Операция проекции. 

            foreach (var person in query)                                       // person - переменная итерации 
                Console.WriteLine(person);

            // Delay.
            Console.ReadKey();
        }
    }
}
