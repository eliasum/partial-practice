using System;

namespace Lessons8
{
    public struct Notebook
    {
        readonly string model;
        readonly string producer;
        readonly double price;

        public string Model
        {
            get { return model; }
        }

        public string Producer
        {
            get { return producer; }
        }

        public double Price
        {
            get { return price; }
        }

        public Notebook(string model, string producer, double price)
        {
            this.model = model;
            this.producer = producer;
            this.price = Math.Abs(price);
        }

        public Notebook(string model)
            : this(model, "", 0)
        {
        }
        public Notebook(double price)
            : this("", "", price)
        {
        }

        public void Show()
        {
            Console.WriteLine("Модель {0} от {1} стоимостью {2}$", model, producer, price);
        }
    }
}
