using System;

namespace Task_4
{
    class Article
    {
        double price;

        public string Name { get; private set; }
        public string Shop { get; set; }

        public double Price
        {
            set
            {
                if (value >= 0)
                    price = value;
                else
                    Console.WriteLine("Стоимость не может быть отрицательной");
            }
            get { return price; }
        }

        public Article(string name)
        {
            Name = name;
        }

        public Article(string name, string shop, double price)
        {
            Name = name;
            Shop = shop;
            Price = price;
        }

        public string Info()
        {
            return string.Format("{0} из {1} стоимость : {2} грн.", Name, Shop, Price);
        }
    }
}
