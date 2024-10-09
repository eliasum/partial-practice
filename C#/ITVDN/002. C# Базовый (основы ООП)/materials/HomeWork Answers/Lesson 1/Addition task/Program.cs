using System;

// Задание
// Используя Visual Studio, создайте проект по шаблону Console Application. 
// Требуется: 
// Создать класс с именем Address.
// В теле класса, требуется создать поля: index, country, city, street, house, apartment.  
// Для каждого поля, создать свойство с двумя методами доступа. 
// Создать экземпляр класса Address. 
// В поля экземпляра записать информацию о почтовом адресе. 
// Выведите на экран значения полей описывающих адрес.

namespace Lessons_1
{
    class Address
    {
        // Переменные, над которыми нет смысла производить арифметических операций,
        // следует создавать с типом string. (Например: index, или год рождения...)

        private string index;
        public string Index
        {
            get { return index; }
            set { index = value; }
        }

        private string country;
        public string Country
        {
            get { return country; }
            set { country = value; }
        }

        private string city;
        public string City
        {
            get { return city; }
            set { city = value; }
        }

        private string street;
        public string Street
        {
            get { return street; }
            set { street = value; }
        }

        private string house;
        public string House
        {
            get { return house; }
            set { house = value; }
        }

        private string apartment;
        public string Apartment
        {
            get { return apartment; }
            set { apartment = value; }
        }
    }
    class Program
    {
        static void Main()
        {
            Address address = new Address();

            address.Country = "Ukraine";
            address.City = "Kiev";
            address.Street = "Khreshchatyk Street";
            address.House = "1";
            address.Apartment = "1";
            address.Index = "11111";

            Console.WriteLine(address.Country);
            Console.WriteLine(address.City);
            Console.WriteLine(address.Street);
            Console.WriteLine(address.House);
            Console.WriteLine(address.Apartment);
            Console.WriteLine(address.Index);

            //Delay.
            Console.ReadKey();
        }
    }
}
