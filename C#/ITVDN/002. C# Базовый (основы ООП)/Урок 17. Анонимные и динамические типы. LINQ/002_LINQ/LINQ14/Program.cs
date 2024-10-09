/*2022.10.11 17:56 IMM*/
using System;
using System.Collections.Generic;
using System.Linq;

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
                new Employee {LastName = "Andreev", FirstName = "Andrew",  Nationality = "Ukrainian"},
                new Employee {LastName = "Ivanov",  FirstName = "Ivan",    Nationality = "Russian"},
                new Employee {LastName = "Andreev", FirstName = "Ivan",  Nationality = "Ukrainian"},
                new Employee {LastName = "Petrov",  FirstName = "Petr",    Nationality = "American"},
                new Employee {LastName = "Andreev", FirstName = "Sergey",  Nationality = "Ukrainian"},
                new Employee {LastName = "Petrov",  FirstName = "Slava",    Nationality = "American"}
            };

            // Построить запрос.
            /*
                присвоить переменной запроса linq возвращаемое значение выражения запроса, которое 
                трансформируется в последовательность вызовов расширяющих методов
            */
            var query = from emp in employees                                                           // from - объявляет переменную диапазона emp.
                        group emp by new { Nationality = emp.Nationality, LastName = emp.LastName };    // group - является средством для разделения ввода запроса.
                                                                                                        // сгруппировать по экземплярам анонимного типа
            foreach (var group in query)                                                                // group - переменная итерации 
            {
                Console.WriteLine(group.Key);

                foreach (var employee in group)                                                         // employee - переменная итерации 
                    Console.WriteLine(employee.FirstName);
            }

            // Delay.
            Console.ReadKey();
        }
    }
}
