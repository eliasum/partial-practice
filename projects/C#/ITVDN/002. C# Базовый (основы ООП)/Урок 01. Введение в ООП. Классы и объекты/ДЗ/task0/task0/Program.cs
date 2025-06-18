using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace task0
{
    class Address
    {
        int index;
        string country;
        string city;
        string street;
        int house;
        int apartment;

        public int Index { get => index; set => index = value; }
        public string Country { get => country; set => country = value; }
        public string City { get => city; set => city = value; }
        public string Street { get => street; set => street = value; }
        public int House { get => house; set => house = value; }
        public int Apartment { get => apartment; set => apartment = value; }

        public Address(int index, string country, string city, string street, int house, int apartment)
        {
            this.index = index;
            this.country = country;
            this.city = city;
            this.street = street;
            this.house = house;
            this.apartment = apartment;
        }

        /*
        public Address()
        {

        }
        */
    }

    class Program
    {
        static void Main(string[] args)
        {
            Address adres = new Address(111, "rus", "nsk", "bhm", 11, 46);

            Console.WriteLine("index = {0}, country = {1}, city = {2}, street = {3}, house = {4}, apartment = {5}",
                adres.Index, adres.Country, adres.City, adres.Street, adres.House, adres.Apartment);

            Console.ReadKey();
        }
    }
}
