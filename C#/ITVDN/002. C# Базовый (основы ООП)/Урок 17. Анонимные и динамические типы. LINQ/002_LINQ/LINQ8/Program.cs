/*2022.10.11 16:08 IMM*/
using System;
using System.Collections.Generic;
using System.Linq;

// orderby - используется для сортировки (последовательности) результата запроса.

namespace LINQ
{
    public class Employee
    {
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string Nationality { get; set; }
    }

    class Program
    {
        static void Main()
        {
            // Построить коллекцию сотрудников с национальностями.
            var employees = new List<Employee>
            {
                // список из анонимных экземпляров класса Employee
                new Employee {LastName = "Ivanov", FirstName = "Ivan", Nationality = "Russian"},
                new Employee {LastName = "Andreev", FirstName = "Andrew", Nationality = "Ukrainian"},
                new Employee {LastName = "Petrov", FirstName = "Petr", Nationality = "American"}
            };

            // Построить запрос.
            // Получение списка имен всех сотрудников вместе с их национальностями.
            var query = from emp in employees                   // from - объявляет переменную диапазона emp.
                        orderby emp.Nationality ascending,      // orderby - используется для сортировки (последовательности) результата запроса.
                        emp.LastName descending,                // ascending - по возрастанию | descending - по убыванию.
                        emp.FirstName descending                // по умолчанию - ascending.
                        select emp;                             // select - Операция проекции.

            foreach (var person in query)
                Console.WriteLine("{0}, \t{1}, \t{2}", person.LastName, person.FirstName, person.Nationality);

            // Delay.
            Console.ReadKey();
        }
    }
}
