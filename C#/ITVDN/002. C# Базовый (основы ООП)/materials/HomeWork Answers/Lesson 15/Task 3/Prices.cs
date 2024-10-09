using System;
using System.Linq;

namespace Task_3
{
    class PriceTable
    {
        struct Prices
        {
            string shop;
            string number;
            uint? price;

            public string Shop
            {
                get { return shop; }
            }

            public string Number
            {
                get { return number; }
            }

            public uint? Price
            {
                get { return price; }
            }

            public Prices(string number, string shop, uint? price)
            {
                this.shop = shop;
                this.price = price;
                this.number = number;
            }

            public string Show()
            {
                return string.Format("Товар № {0} из магазина {1} стоит {2}", number, shop, price);
            }
        }

        Prices[] product;

        public PriceTable()
        {
            product = new Prices[2];
            string shop;
            string number;
            uint? price;

            for (int i = 0; i < 2; i++)
            {
                Console.WriteLine("Введите номер товара");
                number = Console.ReadLine();

                Console.WriteLine("Введите магазин");
                shop = Console.ReadLine();

                Console.WriteLine("Введите цену");
                try
                {
                    price = Convert.ToUInt32(Console.ReadLine());
                }
                catch (Exception e)
                {
                    Console.WriteLine("Попытка записи неверного формата.");
                    Console.WriteLine(e.Message);
                    price = null;
                }
                product[i] = new Prices(number, shop, price);
            }
            product = product.OrderBy(products => products.Number).ToArray<Prices>();
        }

        public string this[int index]
        {
            get
            {
                try
                {
                    return product[index].Show();
                }
                catch (Exception e)
                {
                    Console.WriteLine("Попытка обращения за пределы массива.");
                    Console.WriteLine(e.Message);
                    return "";
                }
            }
        }

        public string this[string index]
        {
            get
            {

                try
                {
                    return product[Convert.ToInt32(index) - 1].Show();
                }
                catch (Exception e)
                {
                    Console.WriteLine("Попытка обращения за пределы массива.");
                    Console.WriteLine(e.Message);
                    return string.Format("\"{0}\" нет такого товара.", index);
                }
            }
        }

    }
}
