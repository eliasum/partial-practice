using System;

namespace Task_3
{
    class House
    {
        private string city;
        private Street street;

        public House(Street street, string city)
        {
            this.street = street;
            this.city = city;
        }

        public House Clone()
        {
            return this; // Поверхностное копирование
        }

        public House DeepClone()
        {
            return new House(this.street.Clone() as Street, this.City);//глубокое копирование
        }

        public Street Street
        {
            get { return street; }
            set { street = value; }
        }

        public string City
        {
            get { return city; }
            set { city = value; }
        }
    }

    class Street : ICloneable
    {
        private string str;

        public Street(string s)
        {
            str = s;
        }

        public string Str
        {
            get { return str; }
        }

        public object Clone()
        {
            return new Street(this.str);
        }
    }
}
