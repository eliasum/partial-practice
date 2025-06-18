/*2022.10.11 15:55 IMM*/
using System;
using System.Collections.Generic;
using System.Linq;

// join (операция объединения) - устанавливает соотношение данных из двух разных источников.

namespace LINQ
{
    public class EmployeeID
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }

    public class EmployeeNationality
    {
        public string Id { get; set; }
        public string Nationality { get; set; }
    }

    class Program
    {
        static void Main()
        {
            // Построить коллекцию сотрудников.
            var employees = new List<EmployeeID>
            {
                new EmployeeID {Id = "111", Name = "Ivan Ivanov"},
                new EmployeeID {Id = "222", Name = "Andrey Andreev"},
                new EmployeeID {Id = "333", Name = "Petr Petrov"},
                new EmployeeID {Id = "444", Name = "Alex Alexeev"}
            };

            // Построить коллекцию национальностей.
            var empNationalities = new List<EmployeeNationality>
            {
                new EmployeeNationality {Id = "111", Nationality = "Russian"},
                new EmployeeNationality {Id = "222", Nationality = "Ukrainian"},
                new EmployeeNationality {Id = "333", Nationality = "American"},
            };

            // Построить запрос.
            // Получение списка имен всех сотрудников вместе с их национальностями, при этом отсортировав список по убыванию.
            var query = from emp in employees                   // from - объявляет переменную диапазона emp.
                        join n in empNationalities              // join (операция объединения) - устанавливает соотношение данных из двух разных источников
                        on emp.Id equals n.Id                   // equals - операция сравнения
                        orderby n.Nationality descending        // ascending - по возрастанию | descending - по убыванию.
                        select new                              // select - Операция проекции.
                        {
                            Id = emp.Id,
                            Name = emp.Name,
                            Nationality = n.Nationality
                        };

            foreach (var person in query)
                Console.WriteLine("{0}, {1}, \t{2}", person.Id, person.Name, person.Nationality);

            // Delay.
            Console.ReadKey();
        }
    }
}
